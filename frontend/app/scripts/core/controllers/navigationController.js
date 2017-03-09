angular
  .module('theme.core.navigation_controller', ['theme.core.services'])
  .controller('NavigationController', ['$scope', '$location', '$timeout', '$rootScope', '$localStorage', '$state',
    function ($scope, $location, $timeout, $rootScope, $localStorage, $state) {
    'use strict';

    var menus = {
      "Default": [
        {
          label: 'Главная',
          priority: 1,
          iconClasses: 'glyphicon glyphicon-th-list',
          url: '#/Dashboard'
        }
      ],
      "Client": [
        {
          label: 'Проекты',
          priority: 2,
          iconClasses: 'glyphicon glyphicon-th-list',
          children: [
            {
              label: 'Проекты',
              url: '#/Projects',
              priority: 1
            },
            {
              label: 'Задачи',
              url: '#/Tasks',
              priority: 2
            }
          ]
        },
      ],
      "Designer": [
        {
          label: 'Ресурсы',
          priority: 1,
          iconClasses: 'glyphicon glyphicon-th-list',
          children: [
            {
              label: 'Сцены',
              url: '#/Scenes',
              priority: 1
            },
            {
              label: 'Модели',
              url: '#/Models',
              priority: 1
            }
          ]
        }
      ],
      "Manager": [
        {
          label: 'Управление проектами',
          priority: 2,
          iconClasses: 'glyphicon glyphicon-th-list',
          children: [
            {
              label: 'Management',
              url: '#/Management',
              priority: 1
            }
          ]
        }
      ],
      "Admin": [
        {
          label: 'Администрирование',
          priority: 2,
          iconClasses: 'glyphicon glyphicon-th-list',
          children: [
            {
              label: 'Пользователи',
              url: '#/Users_Admin',
              priority: 1
            }
          ]
        }
      ]
    };

    //Update Menu
    function updateMenu (user) {

      $scope.menu = menus.Default;

        if(user.client) {
          $scope.menu = $scope.menu.concat(menus.Client);
        }

        if(user.designer) {
          $scope.menu = $scope.menu.concat(menus.Designer);
        }

        if(user.manager) {
          $scope.menu = $scope.menu.concat(menus.Manager);
        }

        if(user.admin) {
          $scope.menu = $scope.menu.concat(menus.Admin);
        }
    }

    updateMenu($localStorage.user || {});

    $rootScope.$on("logged_in", function(event) {
      updateMenu($localStorage.user || {});
      setParent($scope.menu, null);
    });

    //Update Menu

    var setParent = function (children, parent) {
      angular.forEach(children, function (child) {
        child.parent = parent;
        if (child.children !== undefined) {
          setParent(child.children, child);
        }
      });
    };

    $scope.findItemByUrl = function (children, url) {
      for (var i = 0, length = children.length; i < length; i++) {
        if (children[i].url && children[i].url.replace('#', '') === url) {
          return children[i];
        }
        if (children[i].children !== undefined) {
          var item = $scope.findItemByUrl(children[i].children, url);
          if (item) {
            return item;
          }
        }
      }
    };

    //function isPathExists (path) {
    //  var result = false;
    //  angular.forEach(menus, function (menu) {
    //
    //    angular.forEach(menu, function (menuItem) {
    //
    //      if (menuItem.url == path) {
    //        result = true;
    //      }
    //
    //      if (menuItem.children) {
    //        angular.forEach(menuItem.children, function (child) {
    //          if (child.url == path) {
    //            result = true;
    //          }
    //        });
    //      }
    //
    //    });
    //
    //  });
    //
    //  return result;
    //}
    //
    //function isPathAvailable (path) {
    //
    //  var result = false;
    //  angular.forEach($scope.menu, function(menuItem){
    //    if(menuItem.url == path) {
    //      result = true;
    //    }
    //    if(menuItem.children) {
    //      angular.forEach(menuItem.children, function(child){
    //
    //        if(child.url == path) {
    //          result = true;
    //        }
    //      });
    //    }
    //  });
    //
    //  return result;
    //}
    //
    //$scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    //  if(isPathExists($state.href(toState)) && !isPathAvailable($state.href(toState))) {
    //    $location.path('/Dashboard')
    //  }
    //});
    //
    //$scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    //
    //});

    //System
    setParent($scope.menu, null);

    $scope.openItems = [];
    $scope.selectedItems = [];
    $scope.selectedFromNavMenu = false;

    $scope.select = function (item) {
      // close open nodes
      if (item.open) {
        item.open = false;
        return;
      }
      for (var i = $scope.openItems.length - 1; i >= 0; i--) {
        $scope.openItems[i].open = false;
      }
      $scope.openItems = [];
      var parentRef = item;
      while (parentRef !== null) {
        parentRef.open = true;
        $scope.openItems.push(parentRef);
        parentRef = parentRef.parent;
      }

      // handle leaf nodes
      if (!item.children || (item.children && item.children.length < 1)) {
        $scope.selectedFromNavMenu = true;
        for (var j = $scope.selectedItems.length - 1; j >= 0; j--) {
          $scope.selectedItems[j].selected = false;
        }
        $scope.selectedItems = [];
        parentRef = item;
        while (parentRef !== null) {
          parentRef.selected = true;
          $scope.selectedItems.push(parentRef);
          parentRef = parentRef.parent;
        }
      }
    };

    $scope.highlightedItems = [];
    var highlight = function (item) {
      var parentRef = item;
      while (parentRef !== null) {
        if (parentRef.selected) {
          parentRef = null;
          continue;
        }
        parentRef.selected = true;
        $scope.highlightedItems.push(parentRef);
        parentRef = parentRef.parent;
      }
    };

    var highlightItems = function (children, query) {
      angular.forEach(children, function (child) {
        if (child.label.toLowerCase().indexOf(query) > -1) {
          highlight(child);
        }
        if (child.children !== undefined) {
          highlightItems(child.children, query);
        }
      });
    };

    // $scope.searchQuery = '';
    $scope.$watch('searchQuery', function (newVal, oldVal) {
      var currentPath = '#' + $location.path();
      if (newVal === '') {
        for (var i = $scope.highlightedItems.length - 1; i >= 0; i--) {
          if ($scope.selectedItems.indexOf($scope.highlightedItems[i]) < 0) {
            if ($scope.highlightedItems[i] && $scope.highlightedItems[i] !== currentPath) {
              $scope.highlightedItems[i].selected = false;
            }
          }
        }
        $scope.highlightedItems = [];
      } else if (newVal !== oldVal) {
        for (var j = $scope.highlightedItems.length - 1; j >= 0; j--) {
          if ($scope.selectedItems.indexOf($scope.highlightedItems[j]) < 0) {
            $scope.highlightedItems[j].selected = false;
          }
        }
        $scope.highlightedItems = [];
        highlightItems($scope.menu, newVal.toLowerCase());
      }
    });

    $scope.$on('$routeChangeSuccess', function () {
      if ($scope.selectedFromNavMenu === false) {
        var item = $scope.findItemByUrl($scope.menu, $location.path());
        if (item) {
          $timeout(function () {
            $scope.select(item);
          });
        }
      }
      $scope.selectedFromNavMenu = false;
      $scope.searchQuery = '';
    });
  }]);
