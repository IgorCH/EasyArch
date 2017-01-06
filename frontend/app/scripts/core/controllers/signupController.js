angular
  .module('theme.core.signup_controller', ['theme.core.da_data_source'])
  .controller('SignupController', ['$scope', '$theme', 'DADataSource', '$state', '$stateParams',
    function ($scope, $theme, DADataSource, $state, $stateParams) {
      'use strict';

      $scope.email = "test";
      $scope.name = "test";
      $scope.password = "test";
      $scope.password2 = "test";

      $theme.set('fullscreen', true);

      $scope.$on('$destroy', function () {
        $theme.set('fullscreen', false);
      });

      $scope.signup = function () {
        var params = {
          name: $scope.name,
          password: $scope.pass
        };

        DADataSource.registration(params, function (res, isSuccess) {
          if (isSuccess) {
            $state.go($stateParams.redirectTo || 'Dashboard');
          }
        });
      };

      $scope.forgotPass = function () {

      };

    }]);
