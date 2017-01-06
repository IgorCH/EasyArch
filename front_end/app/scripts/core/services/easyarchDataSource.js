angular
  .module('theme.core.services')
  .service('EasyArchDataSource', ["$resource", "$rootScope", "$http", function ($resource, $rootScope, $http) {

    apiUrl = 'http://localhost:8080';


    var authCookie = getCookie('Authorization');
    if (authCookie) {
      $http.defaults.headers.common['Authorization'] = authCookie;
    }

    function isLocal() {
      return window.location.href.indexOf("localhost") > -1;
    }

    function setCookie(name, value, days) {
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
      }
      else var expires = "";
      document.cookie = name + "=" + value + expires + "; path=/";
    }

    /*W*/
    function getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }

    /*W*/
    function deleteCookie(name) {
      setCookie(name, "", -1);
    }

    var rwds = {

      processError: function (response) {
        var result = {};
        console.log(response.config.url, response);
        if (response.status == 401) {
          result.isSuccess = false;
          window.location.href = "#/login";
        } else if (response.status != 200) {
          result.isSuccess = false;
        } else {
          result.isSuccess = true;
          //TODO Если все ok - продливаем сессию
        }
        return result;
      },
      /*W*/
      signup: function (params, callback) {
        $http({
          method: 'POST',
          url: apiUrl + '/api/signup',
          data: params
        }).then(function (response) {
          callback && callback(response, true);
        }, function (response) {
          callback && callback(response, false);
        });

      },
      /*W*/
      login: function (params, callback) {
        $http({
          method: 'POST',
          url: apiUrl + '/api/login',
          data: params
        }).then(function (response) {
          $http.defaults.headers.common['Authorization'] = response.data.token;
          setCookie('Authorization', response.data.token);
          callback && callback(response, true);
        }, function (response) {
          callback && callback(response, false);
        });
      },
      /*W*/
      me: function (params, callback) {
        $http({
          method: 'GET',
          url: apiUrl + '/api/me',
          data: params
        }).then(function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });

      },
      /*W*/
      logout: function (params, callback) {
        $http({
          method: 'POST',
          url: '/api/logout'
        }).then(function successCallback(response) {
          deleteCookie("sessid");
          callback && callback(response, true);
        }, function errorCallback(response) {
          //Spinner.done();
          callback && callback(response, false);
        });
      },
      /******************************************/
      /*W*/
      getUsers: function (params, callback) {
        $http({
          method: 'GET',
          url: apiUrl + '/api/user'
        }).then(function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      getUser: function (params, callback) {
        $http({
          method: 'GET',
          url: apiUrl + '/api/user/' + params.userId
        }).then(function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      createUser: function (params, callback) {
        $http({
          method: 'POST',
          url: apiUrl + '/api/user',
          data: params
        }).then(function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      updateUser: function (params, callback) {
        $http({
          method: 'PUT',
          url: apiUrl + '/api/user/' + params.userId,
          data: params
        }).then(function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      deleteUser: function (params, callback) {
        $http({
          method: 'DELETE',
          url: apiUrl + '/api/user/' + params.userId,
        }).then(function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /******************************************/
      /*W*/
      getProjects: function (params, callback) {
        $http({
          method: 'GET',
          url: apiUrl + '/api/project'
        }).then(function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      getProject: function (params, callback) {
        $http({
          method: 'GET',
          url: apiUrl + '/api/project/' + params.projectId
        }).then(function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      createProject: function (params, callback) {
        $http({
          method: 'POST',
          url: apiUrl + '/api/project',
          data: params
        }).then(function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      updateProject: function (params, callback) {
        $http({
          method: 'PUT',
          url: apiUrl + '/api/project/' + params.projectId,
          data: params
        }).then(function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      deleteProject: function (params, callback) {
        $http({
          method: 'DELETE',
          url: apiUrl + '/api/project/' + params.projectId,
        }).then(function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /******************************************/
      /*W*/
      uploadFile: function (params, callback) {
        var form = new FormData();
        form.append('fileName', params.file);
        $http.post(apiUrl + '/api/file', form, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        }).then(function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /******************************************/
      /*W*/
      getAttachments: function (params, callback) {
        $http({
          method: 'GET',
          url: apiUrl + '/api/attach'
        }).then(function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      getAttachment: function (params, callback) {
        $http({
          method: 'GET',
          url: apiUrl + '/api/attach/' + params.projectId
        }).then(function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      createAttachment: function (params, callback) {
        $http({
          method: 'POST',
          url: apiUrl + '/api/attach',
          data: params
        }).then(function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      },
      /*W*/
      deleteAttachment: function (params, callback) {
        $http({
          method: 'DELETE',
          url: apiUrl + '/api/attach/' + params.projectId,
        }).then(function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        }, function (response) {
          var result = rwds.processError(response);
          callback && callback(response.data, result);
        });
      }
      /******************************************/

    };

    return rwds;
  }])
;
