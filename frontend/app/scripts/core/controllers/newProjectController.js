angular
  .module('theme.core.new_project_controller', ['theme.core.services'])
  .controller('NewProjectController', ['$scope', '$theme', 'EasyArchDataSource',
                          function($scope, $theme, EasyArchDataSource) {
    'use strict';

    $scope.newProject = {
        title: 'new project', //{ type: String, required: true },
        authorId: '',         //{ type: String, required: true },
        square: 0,            //{ type: Number },
        price: '',            //{ type: String },
        status: '',           //{ type: String, required: true, default: 'Created' },
        files: [],            //{ type: Array },
        models: [],           //{ type: Array },
        scenes: [],           //{ type: Array },
        result_files: []      //{ type: Array }
    };

    $scope.createProject = function(){
        EasyArchDataSource.createProject($scope.newProject, function(res, resData) {

        });
    }
  }]);
