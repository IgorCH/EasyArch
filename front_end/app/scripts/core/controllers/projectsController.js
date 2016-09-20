angular
    .module('theme.core.projects_controller', ['theme.core.services'])
    .controller('ProjectsController', ['$scope', '$theme', '$routeParams', 'EasyArchDataSource',
        function ($scope, $theme, $routeParams, EasyArchDataSource) {
            'use strict';

            $scope.projects = [];
            EasyArchDataSource.getProjects({}, function (res, resData) {
                if (resData.isSuccess) {
                    $scope.projects = res;
                }
            });

            $scope.onDeleteProject = function (project) {
                EasyArchDataSource.deleteProject({projectId: project._id}, function (res, resInfo) {
                    if (resInfo.isSuccess) {
                        //TODO Delete project from array
                    }
                });
            };

            $scope.onCreateProject = function () {
                var newProjectParams = {
                    title: 'newProject'
                };
                EasyArchDataSource.createProject(newProjectParams, function(res, resInfo){
                    if(resInfo.isSuccess) {
                        window.location.href = '#/project?id=' + res._id;
                    }
                });
            };
        }]);
