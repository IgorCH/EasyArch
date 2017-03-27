angular
  .module('theme.core.profile_controller', [])
  .controller('ProfileController', ['$scope', '$theme', '$localStorage',
    function ($scope, $theme, $localStorage) {
      'use strict';

      $scope.user = $localStorage.user;

      //$scope.home = {};

      //HomeDataSource.home({}, function (res) {
      //  $scope.home = res.data;
      //  $scope.home.httpWebsite = plusHttpWebsite($scope.home.account_link_website);
      //});
      //
      //function plusHttpWebsite(website) {
      //  if (website && website.indexOf('http') + 1) return website;
      //  else return 'http://' + website;
      //}

    }]);