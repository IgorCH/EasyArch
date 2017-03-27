angular
  .module('theme.core.new_task_controller', ['theme.core.services'])
  .controller('NewTaskController', ['$scope', '$theme', 'ProjectDataSource',
                          function($scope, $theme, ProjectDataSource) {
    'use strict';

    $scope.newTask = {
      title: 'new task',
      description: '',
      projectId: null
    };

    $scope.projects = [];

    getProjects();

    $scope.getProjects = function() {
      //ProjectDataSource.getProjectList()
    };

    $scope.createTask = function(){

    }
  }]);
