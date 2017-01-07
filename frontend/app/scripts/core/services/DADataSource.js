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

          $http.defaults.headers.common.Authorization = 'JWT ' + response.data.token;
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

      }

    };

    return dads;
  }])
;