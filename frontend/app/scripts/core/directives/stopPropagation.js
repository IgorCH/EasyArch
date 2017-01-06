angular.module('theme.core.stop_propagation', [])
.directive('stopPropagation', function () {
  return {
    restrict: 'A',
    link: function (scope, element) {
      element.bind('click', function (e) {
        return false;
      });
    }
  };
});