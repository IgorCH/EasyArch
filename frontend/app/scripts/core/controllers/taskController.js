angular
  .module('theme.core.task_controller', ['theme.core.services'])
  .controller('TaskController', ['$scope', '$theme', '$state', '$stateParams', 'ProjectDataSource',
    function ($scope, $theme, $state, $stateParams, ProjectDataSource) {
      'use strict';

      $scope.task = {};
      ProjectDataSource.getTask({projectId: $stateParams.projectId, taskId: $stateParams.taskId}, function (res) {
        if (res.data.message == "ok") {
          $scope.task = res.data.task;
        }
      });

      $scope.onCreateTask = function(){

      };

      $scope.onDeleteTask = function (task) {

      };

      $scope.onUploadAttach = function (file) {

      };

      $scope.onCreateAttach = function () {

      };

      $scope.onAddModel = function () {

      };

      $scope.onAddScene = function () {

      };

      $scope.onDownloadAllResults = function(){

      };
    }]);
