angular
  .module('theme.core.models_controller', [])
  .controller('ModelsController', ['$scope', '$theme', '$localStorage', '$modal',
    function ($scope, $theme, $localStorage, $modal) {
      'use strict';
      $scope.user = $localStorage.user;
      $scope.options = {
        brand: '',
        category: '',
        style: '',
        material: ''
      };
      $scope.models = [];



      $scope.onAdd = function () {
        var modalInstance = $modal.open({
          templateUrl: 'views/models_upload.html',
          //controller: function($scope, $modalInstance, items) {
          //  $scope.ok = function() {
          //    $modalInstance.close();
          //  };
          //
          //  $scope.cancel = function() {
          //    $modalInstance.dismiss('cancel');
          //  };
          //},
          resolve: {
            items: function() {
              return null;//$scope.items;
            }
          }
        });
      }

    }]);