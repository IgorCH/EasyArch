angular
  .module('theme.core.da_data_source', [])
  .service('DADataSource', ["$rootScope", "$http", "restHelper", '$state', '$cookieStore', function ($rootScope, $http, restHelper, $state, $cookieStore) {

    var profile = {};

    var dads = {
      /*W*/
      registration: function (params, callback) {

        $http({
          method: 'POST',
          url: '/api/user/registration',
          data: params
        }).then(function (response) {

          callback && callback(response, true);
        }, function (response) {

          callback && callback(response, false);
        });

      },
      login: function (params, callback) {
        var self = this;
        $http({
          method: 'POST',
          url: '/api/user/login',
          data: params
        }).then(function (response) {

          $http.defaults.headers.common.Authorization = 'JWT ' + response.data.token;

          //var expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);//now + one day
          //
          //$cookieStore.put("sessid", response.data.sessid);
          //if(response.data.user.UISettings) {
          //  response.data.user.UISettings = JSON.parse(response.data.user.UISettings);
          //}
          //
          //$rootScope.$broadcast('logged_in', response.data);
          callback && callback(response, true);
        }, function (response) {
          callback && callback(response, false);
        });

      },
      /*W*/
      logout: function (params, callback) {

        $http({
          method: 'GET',
          url: '/api/user/logout'
        }).then(function successCallback(response) {
          $cookieStore.remove("sessid");
          callback && callback(response, true);
        }, function errorCallback(response) {
          //Spinner.done();
          callback && callback(response, false);
        });

      },

      session: function (params, callback) {

        $http({
          method: 'GET',
          url: restHelper.isLocal() ? 'api/session.json' : '/api/session',
          data: params
        }).then(function (response) {

          var expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);//now + one day

          $cookieStore.put("sessid", response.data.sessid);
          if(response.data.user.UISettings) {
            response.data.user.UISettings = JSON.parse(response.data.user.UISettings);
          }

          $rootScope.$broadcast('logged_in', response.data);
          callback && callback(response, true);
        }, function (response) {
          callback && callback(response, false);
        });

      },

      /*
      * param settings - string
      * */
      saveSettings: function (settings, callback) {

        $http({
          method: 'PUT',
          url: restHelper.isLocal() ? 'api/settings.json' : '/api/uisettings?settings=' + settings
        }).then(function (response) {
          var result = restHelper.processError(response);
          callback && callback(response.data, result);
        }, function (response) {
          var result = restHelper.processError(response);
          callback && callback(response.data, result);
        });

      },


      testSecret: function () {

        $http({
          method: 'GET',
          url: '/api/user/secret'
        }).then(function (response) {

        }, function (response) {

        });

      }

    };

    return dads;
  }])
;