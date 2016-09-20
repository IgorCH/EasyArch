angular
  .module('theme.core.project_controller', ['theme.core.services'])
  .controller('ProjectController', ['$scope', '$theme', 'EasyArchDataSource', '$routeParams',
    function ($scope, $theme, EasyArchDataSource, $routeParams) {
      'use strict';

      $scope.project = {};
      EasyArchDataSource.getProject({projectId: $routeParams.id}, function (res, resInfo) {
        if (resInfo.isSuccess) {
          $scope.project = res;
        }
      });


      $scope.onCreateTask = function(){

      };

      $scope.onDeleteTask = function (task) {

      };

      $scope.onUploadAttach = function (file) {
        EasyArchDataSource.uploadFile({projectId: $scope.project._id, file: file}, function (res, resInfo) {
          if (resInfo.isSuccess) {

            var newAttach = {

            };
            EasyArchDataSource.createAttach({projectId: $scope.project._id, attach: newAttach}, function (res, resInfo) {
              if (resInfo.isSuccess) {



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
