angular
  .module('theme.core.projects_controller', ['theme.core.services', 'theme.core.project_data_source'])
  .controller('ProjectsController', ['$scope', '$theme', '$state', '$stateParams', 'ProjectDataSource',
    function ($scope, $theme, $state, $stateParams, ProjectDataSource) {
      'use strict';

      $scope.projects = [];
      ProjectDataSource.getProjects({}, function (res) {
        if (res.data.message == "ok") {
          $scope.projects = res.data.projects;
        } else {

        }
      });

      $scope.onDeleteProject = function (project) {
        ProjectDataSource.deleteProject({projectId: project._id}, function (res) {

        });
      };

      $scope.onCreateProject = function () {
        var newProjectParams = {
          title: 'newProject'
        };
        ProjectDataSource.createProject(newProjectParams, function (res) {
          if (res.data.message == "ok") {
            $state.go('Project', {id: res._id});
          }
        });
      };
    }]);
