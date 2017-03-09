angular
  .module('themesApp', ['theme', 'theme.demos'])
  .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
    'use strict';

    $urlRouterProvider.otherwise('/landing');

    $stateProvider

      .state('landing', {
        url: '/landing',
        templateUrl: 'views/Login.html',
        controller: 'LoginController'
      })

      .state('login', {
        url: '/login?redirectTo',
        templateUrl: 'views/Login.html',
        controller: 'LoginController'
      })

      .state('signup', {
        url: '/signup?redirectTo',
        templateUrl: 'views/Signup.html',
        controller: 'LoginController'
      })

      .state('projects', {
        url: '/projects',
        templateUrl: 'views/Projects.html',
        controller: 'ProjectsController'
      })

      .state('project', {
        url: '/project?id',
        templateUrl: 'views/Project.html',
        controller: 'ProjectController'
      })

      .state('tasks', {
        url: '/tasks',
        templateUrl: 'views/Tasks.html',
        controller: 'TasksController'
      })

      .state('task', {
        url: '/task?id',
        templateUrl: 'views/Task.html',
        controller: 'TaskController'
      })

      .state('users', {
        url: '/users',
        templateUrl: 'views/Task.html',
        controller: 'TaskController'
      })

      .state('profile', {
        url: '/profile?id',
        templateUrl: 'views/Task.html',
        controller: 'TaskController'
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
  .run(['DADataSource', '$localStorage', function(DADataSource, $localStorage) {
    //DADataSource.session({}, function(){
    //  $localStorage.user = response.data.user;
    //});
  }])
  ;