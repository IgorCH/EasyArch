angular
  .module('theme.core.file_upload_controller', [])
  .controller('FileUploadController', ['$scope', '$theme', '$state', '$stateParams',
    function ($scope, $theme, $state, $stateParams) {
      'use strict';
      $scope.user = $localStorage.user;
      $scope.dropText = 'Drop files here...';
      $scope.dropClass = '';
      $scope.files = [];

      $timeout(function(){
        var dropbox = document.getElementById("dropbox");

        function dragEnterLeave(evt) {
          evt.stopPropagation();
          evt.preventDefault();
          $scope.$apply(function () {
            $scope.dropText = 'Drop files here...';
            $scope.dropClass = ''
          })
        }
        function dragOver(evt) {
          evt.stopPropagation();
          evt.preventDefault();
          var clazz = 'not-available';
          var ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0
          $scope.$apply(function () {
            $scope.dropText = ok ? 'Drop files here...' : 'Only files are allowed!';
            $scope.dropClass = ok ? 'over' : 'not-available'
          })
        }
        function drop(evt) {
          evt.stopPropagation();
          evt.preventDefault();
          $scope.$apply(function () {
            $scope.dropText = 'Drop files here...';
            $scope.dropClass = '';
          });
          var files = evt.dataTransfer.files;
          if (files.length > 0) {
            $scope.$apply(function () {
              for (var i = 0; i < files.length; i++) {
                $scope.files.push(files[i]);
              }
            })
          }
        }
        dropbox.addEventListener("dragenter", dragEnterLeave, false);
        dropbox.addEventListener("dragleave", dragEnterLeave, false);
        dropbox.addEventListener("dragover", dragOver, false);
        dropbox.addEventListener("drop", drop, false);
      });

      $scope.addFiles = function (element) {
        $scope.$apply(function ($scope) {
          for (var i = 0; i < element.files.length; i++) {
            $scope.files.push(element.files[i]);
          }
          $scope.progressVisible = false;
        });
      };

      function uploadProgress(evt) {
        $scope.$apply(function () {
          if (evt.lengthComputable) {
            $scope.progress = Math.round(evt.loaded * 100 / evt.total)
          } else {
            $scope.progress = 'unable to compute'
          }
        })
      }
      function uploadComplete(evt) {
        /* This event is raised when the server send back a response */
        alert(evt.target.responseText)
      }
      function uploadFailed(evt) {
        alert("There was an error attempting to upload the file.")
      }
      function uploadCanceled(evt) {
        $scope.$apply(function () {
          $scope.progressVisible = false
        });
        alert("The upload has been canceled by the user or the browser dropped the connection.")
      }

      $scope.uploadFile = function () {
        var fd = new FormData();
        for (var i in $scope.files) {
          fd.append("uploadedFile", $scope.files[i])
        }
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", uploadProgress, false);
        xhr.addEventListener("load", uploadComplete, false);
        xhr.addEventListener("error", uploadFailed, false);
        xhr.addEventListener("abort", uploadCanceled, false);
        xhr.open("POST", "/api/file/upload");
        $scope.progressVisible = true;
        xhr.send(fd);
      };

      $scope.deleteFile = function (file) {

      }
    }]);