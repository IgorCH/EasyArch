angular
  .module('theme.core.login_controller', ['theme.core.da_data_source'])
  .controller('LoginController', ['$scope', '$theme', 'DADataSource', '$state', '$stateParams',
    function ($scope, $theme, DADataSource, $state, $stateParams) {
      'use strict';

      $scope.name = "test";
      $scope.pass = "test";

      $scope.profile = {};

      $theme.set('fullscreen', true);

      $scope.$on('$destroy', function () {
        $theme.set('fullscreen', false);
      });

      $scope.logIn = function () {
        var params = {
          name: $scope.name,
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
