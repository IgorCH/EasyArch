angular
  .module('theme.core.home_controller', ['theme.core.services'])
  .controller('HomeController', ['$scope', '$theme', 'ReportWriterDataSource',
                          function($scope, $theme, ReportWriterDataSource) {
    'use strict';

    $scope.home = {};

    ReportWriterDataSource.home({}, function(res) {
      $scope.home = res.data;
    });

  }]);
