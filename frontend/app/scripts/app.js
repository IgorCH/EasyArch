angular
  .module('themesApp', ['theme', 'theme.demos'])
  .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
    'use strict';

    $urlRouterProvider.otherwise('/landing');

    $stateProvider

      .state('landing', {
        url: '/landing',
        templateUrl: 'views/landing.html',
        controller: 'LandingController'
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

      .state('profile', {
        url: '/profile',
        templateUrl: 'views/profile.html',
        controller: 'ProfileController'
      })

      .state('file_upload', {
        url: '/file_upload',
        templateUrl: 'views/file_upload.html',
        controller: 'FileUploadController'
      })

      .state('models', {
        url: '/models',
        templateUrl: 'views/models.html',
        controller: 'ProjectsController'
      })

      .state('projects', {
        url: '/projects',
        templateUrl: 'views/projects.html',
        controller: 'ProjectsController'
      })

      .state('task', {
        url: '/task?projectId&taskId',
        templateUrl: 'views/task.html',
        controller: 'TaskController'
      })

      .state('users', {
        url: '/users',
        templateUrl: 'views/users.html',
        controller: 'UsersController'
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
    DADataSource.session({}, function(res){
      $localStorage.user = res.data.user;
    });
  }])
  ;