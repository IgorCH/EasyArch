angular
  .module('theme.core.login_controller', ['theme.core.services'])
  .controller('LoginController', ['$scope', '$theme', 'ReportWriterDataSource',
                          function($scope, $theme, ReportWriterDataSource) {
    'use strict';

    $scope.name = "0053B000000DtNaQAK";
    $scope.pass = "11223344";

    $theme.set('fullscreen', true);

    $scope.$on('$destroy', function () {
      $theme.set('fullscreen', false);
    });

    $scope.logIn = function () {
      var params = {
        login: $scope.name,
        password: $scope.pass
      };

      ReportWriterDataSource.login(params, function(res, isSuccess) {
        if(isSuccess) {
          window.location.href = "#/__home";
        }
      });
    };

    $scope.forgotPass = function () {

    };

  }]);
