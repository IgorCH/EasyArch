angular
  .module('theme.core.login_controller', ['theme.core.services'])
  .controller('LoginController', ['$scope', '$theme', 'EasyArchDataSource',
                          function($scope, $theme, EasyArchDataSource) {
    'use strict';

    $scope.loginData = {
        name : "admin",
        password : "admin"
    };

    $theme.set('fullscreen', true);

    $scope.$on('$destroy', function () {
      $theme.set('fullscreen', false);
    });

    $scope.logIn = function () {

      EasyArchDataSource.login($scope.loginData, function(res, isSuccess) {
        if(isSuccess) {
          window.location.href = "#/projects";
        }
      });
    };

    $scope.forgotPass = function () {

    };

  }]);
