angular
  .module('theme.core.da_data_source', [])
  .service('DADataSource', ["$rootScope", "$http", "restHelper", '$state', '$cookieStore', '$localStorage',
    function ($rootScope, $http, restHelper, $state, $cookieStore, $localStorage) {

    var dads = {
      /*W*/
      registration: function (params, callback) {
        $http({
          method: 'POST',
          url: '/api/user/registration',
          data: params
        }).then(function (response) {

          $localStorage.user = response.data.user;
          $rootScope.$broadcast("logged_in");

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

          $localStorage.user = response.data.user;
          $rootScope.$broadcast("logged_in");

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
          $localStorage.user = {}
          callback && callback(response, true);
        }, function errorCallback(response) {

          callback && callback(response, false);
        });
      },

      session: function (params, callback) {
        $http({
          method: 'POST',
          url: '/api/user/session',
          data: params
        }).then(function (response) {

          $localStorage.user = response.data.user;
          $rootScope.$broadcast("logged_in");

          callback && callback(response, true);
        }, function (response) {

          callback && callback(response, false);
        });
      }

    };

    return dads;
  }])
;