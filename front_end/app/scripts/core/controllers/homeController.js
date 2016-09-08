angular
  .module('theme.core.home_controller', ['theme.core.services'])
  .controller('HomeController', ['$scope', '$theme', 'EasyArchDataSource',
                          function($scope, $theme, EasyArchDataSource) {
    'use strict';

     EasyArchDataSource.me({}, function(res){

     })
  }]);
