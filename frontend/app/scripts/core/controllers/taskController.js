angular
  .module('theme.core.task_controller', ['theme.core.services'])
  .controller('TaskController', ['$scope', '$theme', '$state', '$stateParams', 'ProjectDataSource',
    function ($scope, $theme, $state, $stateParams, ProjectDataSource) {
      'use strict';

      $scope.task = {};
      $scope.newAttach = {
        fileName: '',
        preview: '',
        description: ''
      };
      $scope.newMessage = {
        text: 'new message'
      };
      $scope.newResult = {
        fileName: '',
        description: ''
      };

      //Init
      ProjectDataSource.getTask({projectId: $stateParams.projectId, taskId: $stateParams.taskId}, function (res) {
        if (res.data.message == "ok") {
          $scope.task = res.data.task;
        }
      });

      //Main

      //Attachments
      $scope.onUploadAttach = function (file) {

      };

      $scope.onAddAttach = function () {

      };


      //Models
      $scope.onAddModel = function () {

      };


      //Messages
      $scope.onAddMessage = function () {
        ProjectDataSource.addMessage($scope.newMessage, function(res) {
          if (res) {

          }
        });
      };

      //Timeline




      //Result
      $scope.onDownloadAllResults = function(){

      };

    }]);
