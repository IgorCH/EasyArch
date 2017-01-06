angular.module('theme.core.sd_grid', [])
  .directive('sdGrid', function () {
    return {

      template: "<table  class=\"table table-bordered table-condensed table-striped\">" +
      "<tr >{{temp}}<td ng-repeat=\"header in model.columnDefs\"> " +
      "<a href=\"\" ng-click=\"sortColumn(header.field)('firstname')\" >" +
      "{{header.displayName || header.field}}&nbsp;" +
      "<i class=\"glyphicon\" ng-class=\"{'glyphicon-chevron-up': upFlag('{{header.field}}'),'glyphicon-chevron-down': downFlag('{{header.field}}')}\"></i>" +
      "</a>" +
      "</td></tr>" +
      "<tr ng-repeat=\"rows in model.myData\"><td ng-repeat=\"header in model.columnDefs\"><span  ng-if='header.cellTemplate'><sd-grid-cell-template ng-model=\"header.cellTemplate\"> </sd-grid></span><span  ng-if='!header.cellTemplate'>{{rows[header.field]}}</span></td></tr>" +
      "</table>"
      ,
      restrict: 'E',

      scope: {
        model: '=ngModel'
      }
      ,
      link: function (scope, element, attrs) {
        /*     scope.onViewAddressDetails = function () {
         alert ("222222222");
         };*/
      },

      controller: function ($scope, $element, $attrs) {

        $scope.Column = null;
        $scope.Flag = null;


        $scope.sortColumn = function (field) {

          if ($scope.Column != field)  $scope.Flag = 'up';
          if (($scope.Column == field) && ($scope.Flag == 'down')) {
            $scope.Flag = 'up';
          }
          else if (($scope.Column == field) && ($scope.Flag == 'up')) {
            $scope.Flag = 'down';
          }
          $scope.Column = field;
        }

        $scope.upFlag = function (field) {
          if ((field == $scope.Column) && ( $scope.Flag == 'down')) return true;
          else if ((field == $scope.Column) && ( $scope.Flag == 'up')) return false;
          else return null;
        };

        $scope.downFlag = function (field) {
          if ((field == $scope.Column) && ( $scope.Flag == 'down')) return false;
          else if ((field == $scope.Column) && ( $scope.Flag == 'up'))  return true;
          else return null;
        };

      }
    }
  })

  .directive('sdGridCellTemplate', ['$compile', function ($compile) {
    return {
      restrict: 'E',
      scope: {
        model: '=ngModel'
      },
      link: function (scope, element) {
        var template = scope.model;
        var linkFn = $compile(template);
        var content = linkFn(scope);
        element.append(content);

        scope.onViewAddressDetails = function () {
          alert("333333333");
        };
      }
    }
  }]);

