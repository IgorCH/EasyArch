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

  .service('EasyArchDataSource', ["$resource", "$rootScope", "$http", function($resource, $rootScope, $http) {

    function isLocal () {
      if(window.location.href.indexOf("localhost") > -1){
        return true;
      }

      return false;
    }

    var rwds = {

      token: "",

      processError: function  (response) {

        var result = {
          isSuccess: true
        };

        console.log(response.config.url, response);

        if(response.status == 401) {

          result.isSuccess = false;
          //Spinner.done();
          //$state.go('login', { stateFrom: $state.current.name });
          window.location.href = "#/login";

        } else if(response.status != 200) {

          result.isSuccess = false;
          //Spinner.done();
          //Popup.showError(response.data);

        } else {

          //Если все ok - продливаем сессию
          //if(rwds.getCookie("sessid")) {
          //rwds.setCookie("sessid", rwds.getCookie("sessid"), 1);
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

      signup: function (params, callback) {
        $http({
          method: 'POST',
          url: 'http://localhost:8080/api/signup',
          data: params
        }).then(function (response) {
          //rwds.setCookie("sessid", response.data.sessid, 1);
          callback && callback(response, true);
        }, function (response) {
          //Spinner.done();
          callback && callback(response, false);
        });

      },
      /*W*/
      login: function (params, callback) {
        $http({
          method: 'POST',
          url: 'http://localhost:8080/api/login',
          data: params
        }).then(function (response) {

          if(response.data.success) {
            $http.defaults.headers.common['Authorization'] = response.data.token;
          }

          callback && callback(response, true);
        }, function (response) {
          //Spinner.done();
          callback && callback(response, false);
        });

      },

      me: function (params, callback) {
          $http({
          method: 'GET',
          url: 'http://localhost:8080/api/me',
          data: params
        }).then(function (response) {
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
