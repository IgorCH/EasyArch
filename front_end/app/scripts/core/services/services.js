angular
  .module('theme.core.services', [])
  .factory('progressLoader', function() {
    'use strict';
    return {
      start: function() {
        angular.element.skylo('start');
      },
      set: function(position) {
        angular.element.skylo('set', position);
      },
      end: function() {
        angular.element.skylo('end');
      },
      get: function() {
        return angular.element.skylo('get');
      },
      inch: function(amount) {
        angular.element.skylo('show', function() {
          angular.element(document).skylo('inch', amount);
        });
      }
    };
  })
  .factory('EnquireService', ['$window', function($window) {
    'use strict';
    return $window.enquire;
  }])
  .factory('pinesNotifications', ['$window', function ($window) {
    'use strict';
    return {
      notify: function (args) {
        args.mouse_reset = false;
        var notification = new $window.PNotify(args);
        notification.notify = notification.update;
        return notification;
      },
    };
  }])
  .factory('$bootbox', ['$modal', '$window', function($modal, $window) {
    'use strict';
    // NOTE: this is a workaround to make BootboxJS somewhat compatible with
    // Angular UI Bootstrap in the absence of regular bootstrap.js
    if (angular.element.fn.modal === undefined) {
      angular.element.fn.modal = function(directive) {
        var that = this;
        if (directive === 'hide') {
          if (this.data('bs.modal')) {
            this.data('bs.modal').close();
            angular.element(that).remove();
          }
          return;
        } else if (directive === 'show') {
          return;
        }

        var modalInstance = $modal.open({
          template: angular.element(this).find('.modal-content').html()
        });
        this.data('bs.modal', modalInstance);
        setTimeout(function() {
          angular.element('.modal.ng-isolate-scope').remove();
          angular.element(that).css({
            opacity: 1,
            display: 'block'
          }).addClass('in');
        }, 100);
      };
    }

    return $window.bootbox;
  }])
  .service('lazyLoad', ['$q', '$timeout', function($q, $t) {
    'use strict';
    var deferred = $q.defer();
    var promise = deferred.promise;
    this.load = function(files) {
      angular.forEach(files, function(file) {
        if (file.indexOf('.js') > -1) { // script
          (function(d, script) {
            var fDeferred = $q.defer();
            script = d.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.onload = function() {
              $t(function() {
                fDeferred.resolve();
              });
            };
            script.onerror = function() {
              $t(function() {
                fDeferred.reject();
              });
            };

            promise = promise.then(function() {
              script.src = file;
              d.getElementsByTagName('head')[0].appendChild(script);
              return fDeferred.promise;
            });
          }(document));
        }
      });

      deferred.resolve();

      return promise;
    };
  }])
  .filter('safe_html', ['$sce', function($sce) {
    'use strict';
    return function(val) {
      return $sce.trustAsHtml(val);
    };
  }])

  .service('ReportWriterDataSource', ["$resource", "$rootScope", "$http", function($resource, $rootScope, $http) {

    function isLocal () {
      if(window.location.href.indexOf("localhost") > -1){
        return true;
      }

      return false;
    }

    var rwds = {

      processError: function  (response) {

        var result = {
          isSuccess: true
        };

        console.log(response.config.url, response);

        if(response.status == 401) {

          result.isSuccess = false;
          //Spinner.done();
          //$state.go('login', { stateFrom: $state.current.name });
          window.location.href = "#/__login";

        } else if(response.status != 200) {

          result.isSuccess = false;
          //Spinner.done();
          //Popup.showError(response.data);

        } else {

          //Если все ok - продливаем сессию
          //if(rwds.getCookie("sessid")) {
          rwds.setCookie("sessid", rwds.getCookie("sessid"), 1);
          //}

        }

        return result;

      },

      setCookie: function (name,value,days) {
        if (days) {
          var date = new Date();
          date.setTime(date.getTime()+(days*24*60*60*1000));
          var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
      },

      getCookie: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
      },

      deleteCookie: function (name) {
        rwds.setCookie(name, "", -1);
      },

      preprocessReport: function  (reports) {

        angular.forEach(reports, function (report) {

          report.Config = JSON.parse(report.Config);

          angular.forEach(report.Config.filters, function(filter) {

            if(filter.defaultValue) {

              if(filter.FieldType == 'd') {

                filter.defaultValue = new Date(filter.defaultValue.substr(0,4), filter.defaultValue.substr(4,2) - 1, filter.defaultValue.substr(6,2));

              } else if(filter.FieldType == 't') {

                filter.defaultValue = new Date(+filter.defaultValue);

              } else if(filter.FieldType == 'm') {
                //TODO Неуверен/Отладить надо
                filter.defaultValue = filter.defaultValue.split(",");

              }

            }

          });

        });

        return reports;

      },

      postprocessReport: function  (report) {

        angular.forEach(report.Config.filters, function(filter) {

          if(filter.LookupData) delete filter.LookupData;

          if(filter.defaultValue) {

            if(filter.FieldType == 'd') {

              filter.defaultValue = "" + new Date(filter.defaultValue).format("yyyymmdd")

            } else if(filter.FieldType == 't') {

              filter.defaultValue = "" + new Date(filter.defaultValue).getTime();

            }
          } else {
            filter.defaultValue = "";
          }

          filter.defaultValue = "" + filter.defaultValue;

        });

        report.Config = JSON.stringify(report.Config);

        return report;
      },

      /*W*/
      login: function (params, callback) {

        $http({
          method: 'POST',
          url: '/api/login',
          data: params
        }).then(function (response) {
          rwds.setCookie("sessid", response.data.sessid, 1);
          callback && callback(response, true);
        }, function (response) {
          //Spinner.done();
          callback && callback(response, false);
        });

      },
      /*W*/
      logout: function (params, callback) {

        $http({
          method: 'POST',
          url: '/api/logout'
        }).then(function successCallback(response) {
          rwds.deleteCookie("sessid");
          callback && callback(response, true);
        }, function errorCallback(response) {
          //Spinner.done();
          callback && callback(response, false);
        });

      },

      home: function (params, callback) {
        $http({
          method: 'GET',
          url: isLocal() ? "api/home.json" : "/api/home",
          data: params
        }).then(function (response) {

          callback && callback(response, true);
        }, function (response) {

          callback && callback(response, false);
        });
      },
      /*W*/
      getAutoComplete: function (params, callback) {
        $http({
          method: 'GET',
          url: '/api/reportwriter/ac/field?object=' + params.object + "&v="+params.text
        }).then(function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      getAutoCompleteForHeaders: function (params, callback) {
        $http({
          method: 'GET',
          url: '/api/reportwriter/ac/field?object=SDAccount&v=' + params.text
        }).then(function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      getPickList: function(params, callback) {
        $http({
          method: 'GET',
          url: '/api/picklist?fieldid=' + params.fieldid
        }).then(function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      getPickLists: function(params, callback) {
        $http({
          method: 'GET',
          url: '/api/picklist?fieldids=' + params.fieldids
        }).then(function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      getLookup: function(params, callback) {
        $http({
          method: 'GET',
          url: '/api/lookup/' + params.object + '?limit=' + params.limit + '&offset=' + params.offset + '&search=' + params.search
        }).then(function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      getObjects: function (params, callback) {

        var url = "/api/reportwriter/objects";

        if(params.showreports) {
          url = url + "?showreports=1";
        }

        $http({
          method: 'GET',
          url: url
        }).then(function(response){
          var result = rwds.processError(response);

          angular.forEach(response.data, function(item) {
            item.Reports = rwds.preprocessReport(item.Reports);
          });

          callback && callback(response.data, result);
        }, function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      generateReport: function (params, callback) {

        //TODO Убрать отсюда
        angular.forEach(params.Filters, function(filter) {
          if(filter.defaultValue == undefined || filter.defaultValue == null) {
            filter.defaultValue = "";
          }
          filter.defaultValue = "" + filter.defaultValue;
        });

        $http({
          method: 'POST',
          url: '/api/reportwriter/',
          data: params
        }).then(function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      generatePDF: function (params, callback) {
        $http({
          method: 'POST',
          url: '/api/reportwriter?view=pdf',
          data: params,
          responseType: 'arraybuffer'
        }).then(function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });

      },
      /******************************************/
      /*W*/
      getChapter: function (params, callback) {
        $http({
          method: 'GET',
          url: '/api/reportwriter/chapter?object=' + params.object
        }).then(function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      getChapters: function (params, callback) {
        $http({
          method: 'GET',
          url: '/api/reportwriter/chapter?object=' + params.object + '&showfields=1'
        }).then(function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      createChapter: function (params, callback) {
        $http({
          method: 'POST',
          url: '/api/reportwriter/chapter',
          data: params
        }).then(function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      updateChapter: function (params, callback) {
        $http({
          method: 'PUT',
          url: '/api/reportwriter/chapter/' + params.Id,
          data: params
        }).then(function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });

      },
      /*W*/
      deleteChapter: function (params, callback) {
        $http({
          method: 'DELETE',
          url: '/api/reportwriter/chapter/' + params.Id
        }).then(function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      reorderChapter: function (params, callback) {
        $http({
          method: 'PATCH',
          url: '/api/reportwriter/chapter/',
          data: params
        }).then(function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /******************************************/
      /*W*/
      getField: function (params, callback) {
        $http({
          method: 'GET',
          url: '/api/reportwriter/field?chapter=' + params.chapter
        }).then(function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      createField: function (params, callback) {
        $http({
          method: 'POST',
          url: '/api/reportwriter/field',
          data: params
        }).then(function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      updateField: function (params, callback) {
        $http({
          method: 'PUT',
          url: '/api/reportwriter/field/' + params.Id,
          data: params
        }).then(function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      deleteField: function (params, callback) {
        $http({
          method: 'DELETE',
          url: '/api/reportwriter/field/' + params.Id
        }).then(function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      reorderField: function (params, callback) {
        $http({
          method: 'PATCH',
          url: '/api/reportwriter/field/',
          data: params
        }).then(function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /******************************************/
      /*W*/
      getReport: function (params, callback) {
        $http({
          method: 'GET',
          url: '/api/reportwriter/report?object=' + params.object
        }).then(function(response){
          rwds.processError(response);
          response.data = rwds.preprocessReport(response.data);
          callback && callback(response.data);
        }, function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      createReport: function (params, callback) {

        params = rwds.postprocessReport (params);

        $http({
          method: 'POST',
          url: '/api/reportwriter/report',
          data: params
        }).then(function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      updateReport: function (params, callback) {

        params = rwds.postprocessReport (params);

        $http({
          method: 'PUT',
          url: '/api/reportwriter/report/' + params.Object,
          data: params
        }).then(function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      deleteReport: function (params, callback) {
        $http({
          method: 'DELETE',
          url: '/api/reportwriter/report/' + params.Id
        }).then(function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function(response){
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      }
      /******************************************/

    };

    return rwds;
  }])
;
