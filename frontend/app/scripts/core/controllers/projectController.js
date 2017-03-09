angular
  .module('theme.core.project_controller', ['theme.core.services'])
  .controller('ProjectController', ['$scope', '$theme', '$state', '$stateParams', 'ProjectDataSource',
    function ($scope, $theme, $state, $stateParams, ProjectDataSource) {
      'use strict';

      $scope.project = {};
      ProjectDataSource.getProject({projectId: $stateParams.id}, function (res) {
        if (res.data.message == "ok") {
          $scope.project = res;
        }
      });


      $scope.onCreateTask = function(){

      };

      $scope.onDeleteTask = function (task) {

      };

      $scope.onUploadAttach = function (file) {
        ProjectDataSource.uploadFile({projectId: $scope.project._id, file: file}, function (res) {
          if (res.data.message == "ok") {

            var newAttach = {

            };
            ProjectDataSource.createAttach({projectId: $scope.project._id, attach: newAttach}, function (res) {
              if (res.data.message == "ok") {



              }
            });
          } else {

          }
        });

      };

      $scope.onCreateAttach = function () {
        if(!$scope.project.attachments) $scope.project.attachments = [];
        var newAttach = {

        };
        $scope.project.attachments.push(newAttach);
      };

      $scope.onAddModel = function () {

      };

      $scope.onAddScene = function () {

      };




      $scope.onDownloadAllResults = function(){

      };
    }]);
