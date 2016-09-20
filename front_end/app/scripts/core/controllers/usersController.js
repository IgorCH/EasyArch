angular
  .module('theme.core.users_controller', ['theme.core.services'])
  .controller('UsersController', ['$scope', '$theme', 'EasyArchDataSource',
                          function($scope, $theme, EasyArchDataSource) {
    'use strict';

    $scope.users = [];
    EasyArchDataSource.getUsers({}, function(res, resInfo) {
      $scope.users = res;
    });


    $scope.onUpdateUser = function(user) {

    };

    $scope.onDeleteUser = function(user) {

    };
}]);
