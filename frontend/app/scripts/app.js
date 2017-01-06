angular
  .module('themesApp', ['theme', 'theme.demos'])
  .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
    'use strict';

    $urlRouterProvider.otherwise('/Dashboard');

    $stateProvider

      .state('Login', {
        url: '/Login?redirectTo',
        templateUrl: 'views/Login.html',
        controller: 'LoginController'
      })
      .state('Signup', {
        url: '/Signup?redirectTo',
        templateUrl: 'views/Signup.html',
        controller: 'LoginController'
      })

      .state('Dashboard', {
        url: '/Dashboard',
        templateUrl: 'views/DashboardHome.html',
        controller: 'DashboardHomeController'
      })

    }
  ])

  .config(['$httpProvider', '$provide', '$compileProvider', function ($httpProvider, $provide, $compileProvider) {

    $provide.decorator('$q', function ($delegate) {
      var defer = $delegate.defer;
      $delegate.defer = function () {
        var deferred = defer();
        deferred.promise.success = function (fn) {
          deferred.promise.then(function () {
            fn.apply(this, arguments);
          });
          return deferred.promise;
        };
        deferred.promise.error = function (fn) {
          deferred.promise.then(null, function () {
            fn.apply(this, arguments);
          });
          return deferred.promise;
        };
        return deferred;
      };
      return $delegate;
    });

    $provide.factory('httpInterceptor', ['$q', 'progressLoader', function ($q, progressLoader) {
      return {
        'request': function (config) {
          //console.log('req', config);
          return config || $q.when(config);
        },
        'response': function (response) {
          //console.log('res', response);
          return response || $q.when(response);
        },
        'requestError': function (rejection) {
          //console.log('reqError', rejection);
          return $q.reject(rejection);
        },
        'responseError': function (rejection) {
          //console.log('resError', rejection);
          return $q.reject(rejection);
        }
      };
    }]);

    $httpProvider.interceptors.push('httpInterceptor');

  }])
  //.run(['DADataSource', function(DADataSource) {

  //}])
  ;