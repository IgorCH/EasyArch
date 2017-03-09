angular
    .module('theme.core.project_data_source', [])
    .service('ProjectDataSource', ["$rootScope", "$http", "restHelper", '$state',
        function ($rootScope, $http, restHelper, $state) {

            var ds = {
                /*W*/
                getProjects: function (params, callback) {
                    $http({
                        method: 'GET',
                        url: '/api/projects/',
                        data: params
                    }).then(function (response) {
                        restHelper.processError(response);
                        callback && callback(response, true);
                    }, function (response) {
                        restHelper.processError(response);
                        callback && callback(response, false);
                    });

                },
                getProject: function (params, callback) {

                    $http({
                        method: 'GET',
                        url: '/api/projects/' + params.projectId,
                        data: params
                    }).then(function (response) {
                        restHelper.processError(response);
                        callback && callback(response, true);
                    }, function (response) {
                        restHelper.processError(response);
                        callback && callback(response, false);
                    });

                },
                createProject: function (params, callback) {
                    var self = this;
                    $http({
                        method: 'POST',
                        url: '/api/projects/',
                        data: params
                    }).then(function (response) {
                        restHelper.processError(response);
                        callback && callback(response, true);
                    }, function (response) {
                        restHelper.processError(response);
                        callback && callback(response, false);
                    });

                },
                /*W*/
                updateProject: function (params, callback) {

                    $http({
                        method: 'POST',
                        url: '/api/projects/'
                    }).then(function successCallback(response) {
                        restHelper.processError(response);
                        callback && callback(response, true);
                    }, function errorCallback(response) {
                        restHelper.processError(response);
                        callback && callback(response, false);
                    });

                },

                deleteProject: function (params, callback) {

                    $http({
                        method: 'DELETE',
                        url: '/api/projects/'
                    }).then(function successCallback(response) {
                        restHelper.processError(response);
                        callback && callback(response, true);
                    }, function errorCallback(response) {
                        restHelper.processError(response);
                        callback && callback(response, false);
                    });

                }

            };

            return ds;
        }])
;