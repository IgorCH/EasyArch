angular
    .module('theme.core.signup_controller', ['theme.core.services'])
    .controller('SignupController', ['$scope', '$theme', 'EasyArchDataSource', function ($scope, $theme, EasyArchDataSource) {
        'use strict';

        $theme.set('fullscreen', true);

        $scope.$on('$destroy', function () {
            $theme.set('fullscreen', false);
        });

        $scope.signupData =
        {
            name: '',
            email: '',
            password: '',
            password2: ''
        };


        $scope.onCancel = function () {

        };
        $scope.onSignup = function () {
            EasyArchDataSource.signup($scope.signupData, function(res){

            })
        }
    }]);
