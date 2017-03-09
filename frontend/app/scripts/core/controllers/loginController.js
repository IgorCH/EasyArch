angular
  .module('theme.core.login_controller', ['theme.core.da_data_source'])
  .controller('LoginController', ['$scope', '$theme', 'DADataSource', '$state', '$stateParams',
    function ($scope, $theme, DADataSource, $state, $stateParams) {
      'use strict';

      $scope.email = "client@mail.com";
      $scope.pass = "client";

      $scope.profile = {};

      $theme.set('fullscreen', true);

      $scope.$on('$destroy', function () {
        $theme.set('fullscreen', false);
      });

      $scope.logIn = function () {
        var params = {
          email: $scope.email,
          password: $scope.pass
        };

        DADataSource.login(params, function (res, isSuccess) {
          if (isSuccess) {
            $state.go($stateParams.redirectTo || 'Dashboard');
          }
        });
      };

      $scope.forgotPass = function () {

      };

    }]);
