angular
  .module('theme.core.navigation_controller', ['theme.core.services'])
  .controller('NavigationController', ['$scope', '$location', '$timeout', '$rootScope', '$localStorage', '$state', function ($scope, $location, $timeout, $rootScope, $localStorage, $state) {
    'use strict';

    var menus = {
      "Default": [],
      "Administrator": [
        {
          label: 'Dashboard',
          priority: 1,
          iconClasses: 'glyphicon glyphicon-th-list',
          url: '#/Dashboard'
        },
        {
          label: 'Projects',
          priority: 2,
          iconClasses: 'glyphicon glyphicon-th-list',
          children: [
            {
              label: 'Address',
              url: '#/AddressList',
              priority: 1
            },
            {
              label: 'Contacts',
              url: '#/ContactsList',
              priority: 2
            },
            {
              label: 'Items',
              url: '#/ItemsList',
              priority: 3
            },

            {
              label: 'Proposals',
              url: '#/ProposalsList',
              priority: 4
            },
            {
              label: 'Orders',
              url: '#/OrdersList',
              priority: 5
            },
            {
              label: 'Invoices',
              url: '#/InvoicesList',
              priority: 6
            },
            {
              lineSeparator: true,
              priority: 7
            },
            {
              label: 'Activities',
              url: '#/ActivitiesList',
              priority: 8
            },
            {
              label: 'Timelines',
              url: '#/Timelines',
              priority: 9
            },
            {
              label: 'Calendar',
              url: '#/Calendar',
              priority: 10
            }
          ]
        },
        {
          label: 'Accounting',
          priority: 3,
          iconClasses: 'glyphicon glyphicon-usd',
          children: [
            {
              label: 'Balance',
              url: '#/Balance',
              priority: 1
            },
            {
              label: 'MONEY IN',
              url: '#/MoneyIn',
              priority: 2
            },
            {
              label: 'Make Deposit',
              url: '#/MakeDeposit',
              priority: 3
            },
            {
              label: 'MONEY OUT',
              url: '#/MoneyOut',
              priority: 4
            },
            {
              label: 'Reconciliation',
              url: '#/Reconciliation',
              priority: 5
            },
            {
              label: 'Journal Entry',
              url: '#/JournalEntry',
              priority: 6
            },
            {
              label: 'General Ledger',
              url: '#/GeneralLedger',
              priority: 7
            }
          ]
        },
        {
          label: 'Client Portal',
          priority: 4,
          iconClasses: 'glyphicon glyphicon-file',
          url: '#/ClientPresentationsList'
        },
        {
          label: 'Vendor Portal',
          priority: 5,
          iconClasses: 'glyphicon glyphicon-file',
          children: [
            {
              label: 'New Products',
              url: '#/NewProducts'
            },
            {
              label: 'My Products',
              url: '#/MyProducts'
            },
            {
              label: 'My Inventory',
              url: '#/MyInventory'
            },
            {
              label: 'Orders',
              url: '#/Orders'
            }
          ]
        },
        {
          label: 'Files',
          priority: 6,
          iconClasses: 'glyphicon glyphicon-file',
          url: '#/Files'
        },
        {
          label: 'Reports',
          priority: 7,
          iconClasses: 'glyphicon glyphicon-print',
          children: [
            {
              label: 'Reports',
              url: '#/RW_Generator',
              priority: 1
            },
            {
              label: 'Financials',
              url: '#/ReportsFinancials',
              priority: 2
            }
          ]
        },
        {
          label: 'Administration',
          priority: 8,
          iconClasses: 'glyphicon glyphicon-file',
          children: [
            {
              label: 'Users',
              url: '#/Admin_Users',
              priority: 1
            },
            {
              label: 'Accounts',
              url: '#/Admin_Accounts',
              priority: 2
            },
            {
              label: 'Control Panel',
              url: '#/RW_ControlPanel',
              priority: 3
            }
          ]
        }
      ],
      "Sales": [
        {
          label: 'Dashboard',
          priority: 1,
          iconClasses: 'glyphicon glyphicon-th-list',
          url: '#/Dashboard'
        }
      ],
      "Support": [
        {
          label: 'Dashboard',
          priority: 1,
          iconClasses: 'glyphicon glyphicon-th-list',
          url: '#/Dashboard'
        },
        {
          label: 'Projects',
          priority: 2,
          iconClasses: 'glyphicon glyphicon-th-list',
          children: [
            {
              label: 'Address',
              url: '#/AddressList',
              priority: 1
            },
            {
              label: 'Contacts',
              url: '#/ContactsList',
              priority: 2
            },
            {
              label: 'Items',
              url: '#/ItemsList',
              priority: 3
            },

            {
              label: 'Proposals',
              url: '#/ProposalsList',
              priority: 4
            },
            {
              label: 'Orders',
              url: '#/OrdersList',
              priority: 5
            },
            {
              label: 'Invoices',
              url: '#/InvoicesList',
              priority: 6
            },
            {
              lineSeparator: true,
              priority: 7
            },
            {
              label: 'Activities',
              url: '#/ActivitiesList',
              priority: 8
            },
            {
              label: 'Timelines',
              url: '#/Timelines',
              priority: 9
            },
            {
              label: 'Calendar',
              url: '#/Calendar',
              priority: 10
            }
          ]
        },
        {
          label: 'Accounting',
          priority: 3,
          iconClasses: 'glyphicon glyphicon-usd',
          children: [
            {
              label: 'Balance',
              url: '#/Balance',
              priority: 1
            },
            {
              label: 'MONEY IN',
              url: '#/MoneyIn',
              priority: 2
            },
            {
              label: 'Make Deposit',
              url: '#/MakeDeposit',
              priority: 3
            },
            {
              label: 'MONEY OUT',
              url: '#/MoneyOut',
              priority: 4
            },
            {
              label: 'Reconciliation',
              url: '#/Reconciliation',
              priority: 5
            },
            {
              label: 'Journal Entry',
              url: '#/JournalEntry',
              priority: 6
            },
            {
              label: 'General Ledger',
              url: '#/GeneralLedger',
              priority: 7
            }
          ]
        },
        {
          label: 'Client Portal',
          priority: 4,
          iconClasses: 'glyphicon glyphicon-file',
          url: '#/ClientPresentationsList'
        },
        {
          label: 'Vendor Portal',
          priority: 5,
          iconClasses: 'glyphicon glyphicon-file',
          children: [
            {
              label: 'New Products',
              url: '#/NewProducts'
            },
            {
              label: 'My Products',
              url: '#/MyProducts'
            },
            {
              label: 'My Inventory',
              url: '#/MyInventory'
            },
            {
              label: 'Orders',
              url: '#/Orders'
            }
          ]
        },
        {
          label: 'Files',
          priority: 6,
          iconClasses: 'glyphicon glyphicon-file',
          url: '#/Files'
        },
        {
          label: 'Reports',
          priority: 7,
          iconClasses: 'glyphicon glyphicon-print',
          children: [
            {
              label: 'Reports',
              url: '#/RW_Generator',
              priority: 1
            },
            {
              label: 'Financials',
              url: '#/ReportsFinancials',
              priority: 2
            }
          ]
        },
        {
          label: 'Administration',
          priority: 8,
          iconClasses: 'glyphicon glyphicon-file',
          children: [
            {
              label: 'Users',
              url: '#/Admin_Users',
              priority: 1
            },
            {
              label: 'Accounts',
              url: '#/Admin_Accounts',
              priority: 2
            },
            {
              label: 'Control Panel',
              url: '#/RW_ControlPanel',
              priority: 3
            }
          ]
        }
      ],
      "User": [
        {
          label: 'Dashboard',
          priority: 1,
          iconClasses: 'glyphicon glyphicon-th-list',
          url: '#/Dashboard'
        },
        {
          label: 'Projects',
          priority: 2,
          iconClasses: 'glyphicon glyphicon-th-list',
          children: [
            {
              label: 'Address',
              url: '#/AddressList',
              priority: 1
            },
            {
              label: 'Contacts',
              url: '#/ContactsList',
              priority: 2
            },
            {
              label: 'Items',
              url: '#/ItemsList',
              priority: 3
            },

            {
              label: 'Proposals',
              url: '#/ProposalsList',
              priority: 4
            },
            {
              label: 'Orders',
              url: '#/OrdersList',
              priority: 5
            },
            {
              label: 'Invoices',
              url: '#/InvoicesList',
              priority: 6
            },
            {
              lineSeparator: true,
              priority: 7
            },
            {
              label: 'Activities',
              url: '#/ActivitiesList',
              priority: 8
            },
            {
              label: 'Timelines',
              url: '#/Timelines',
              priority: 9
            },
            {
              label: 'Calendar',
              url: '#/Calendar',
              priority: 10
            }
          ]
        },
        {
          label: 'Accounting',
          priority: 3,
          iconClasses: 'glyphicon glyphicon-usd',
          children: [
            {
              label: 'Balance',
              url: '#/Balance',
              priority: 1
            },
            {
              label: 'MONEY IN',
              url: '#/MoneyIn',
              priority: 2
            },
            {
              label: 'Make Deposit',
              url: '#/MakeDeposit',
              priority: 3
            },
            {
              label: 'MONEY OUT',
              url: '#/MoneyOut',
              priority: 4
            },
            {
              label: 'Reconciliation',
              url: '#/Reconciliation',
              priority: 5
            },
            {
              label: 'Journal Entry',
              url: '#/JournalEntry',
              priority: 6
            },
            {
              label: 'General Ledger',
              url: '#/GeneralLedger',
              priority: 7
            }
          ]
        },
        {
          label: 'Client Portal',
          priority: 4,
          iconClasses: 'glyphicon glyphicon-file',
          url: '#/ClientPresentationsList'
        },
        {
          label: 'Vendor Portal',
          priority: 5,
          iconClasses: 'glyphicon glyphicon-file',
          children: [
            {
              label: 'New Products',
              url: '#/NewProducts',
              priority: 1
            },
            {
              label: 'My Products',
              url: '#/MyProducts',
              priority: 2
            },
            {
              label: 'My Inventory',
              url: '#/MyInventory',
              priority: 3
            },
            {
              label: 'Orders',
              url: '#/Orders',
              priority: 4
            }
          ]
        },
        {
          label: 'Files',
          priority: 6,
          iconClasses: 'glyphicon glyphicon-file',
          url: '#/Files'
        },
        {
          label: 'Reports',
          priority: 7,
          iconClasses: 'glyphicon glyphicon-print',
          children: [
            {
              label: 'Reports',
              url: '#/Reports',
              priority: 1
            },
            {
              label: 'Report Builder',
              url: '#/RW_Generator',
              priority: 2
            },
            {
              label: 'Control Panel',
              url: '#/RW_ControlPanel',
              priority: 3
            }
          ]
        }
      ],
      "Tester": [
        {
          label: 'Dashboard',
          priority: 1,
          iconClasses: 'glyphicon glyphicon-th-list',
          url: '#/Dashboard'
        },
        {
          label: 'Projects',
          priority: 2,
          iconClasses: 'glyphicon glyphicon-th-list',
          children: [
            {
              label: 'Address',
              url: '#/AddressList',
              priority: 1
            },
            {
              label: 'Contacts',
              url: '#/ContactsList',
              priority: 2
            },
            {
              label: 'Items',
              url: '#/ItemsList',
              priority: 3
            },

            {
              label: 'Proposals',
              url: '#/ProposalsList',
              priority: 4
            },
            {
              label: 'Orders',
              url: '#/OrdersList',
              priority: 5
            },
            {
              label: 'Invoices',
              url: '#/InvoicesList',
              priority: 6
            },
            {
              lineSeparator: true,
              priority: 7
            },
            {
              label: 'Activities',
              url: '#/ActivitiesList',
              priority: 8
            },
            {
              label: 'Timelines',
              url: '#/Timelines',
              priority: 9
            },
            {
              label: 'Calendar',
              url: '#/Calendar',
              priority: 10
            }
          ]
        },
        {
          label: 'Accounting',
          priority: 3,
          iconClasses: 'glyphicon glyphicon-usd',
          children: [
            {
              label: 'Balance',
              url: '#/Balance',
              priority: 1
            },
            {
              label: 'MONEY IN',
              url: '#/MoneyIn',
              priority: 2
            },
            {
              label: 'Make Deposit',
              url: '#/MakeDeposit',
              priority: 3
            },
            {
              label: 'MONEY OUT',
              url: '#/MoneyOut',
              priority: 4
            },
            {
              label: 'Reconciliation',
              url: '#/Reconciliation',
              priority: 5
            },
            {
              label: 'Journal Entry',
              url: '#/JournalEntry',
              priority: 6
            },
            {
              label: 'General Ledger',
              url: '#/GeneralLedger',
              priority: 7
            }
          ]
        },
        {
          label: 'Client Portal',
          priority: 4,
          iconClasses: 'glyphicon glyphicon-file',
          url: '#/ClientPresentationsList'
        },
        {
          label: 'Vendor Portal',
          priority: 5,
          iconClasses: 'glyphicon glyphicon-file',
          children: [
            {
              label: 'New Products',
              url: '#/NewProducts'
            },
            {
              label: 'My Products',
              url: '#/MyProducts'
            },
            {
              label: 'My Inventory',
              url: '#/MyInventory'
            },
            {
              label: 'Orders',
              url: '#/Orders'
            }
          ]
        },
        {
          label: 'Files',
          priority: 6,
          iconClasses: 'glyphicon glyphicon-file',
          url: '#/Files'
        },
        {
          label: 'Reports',
          priority: 7,
          iconClasses: 'glyphicon glyphicon-print',
          children: [
            {
              label: 'Reports',
              url: '#/RW_Generator',
              priority: 2
            },
            {
              label: 'Financials',
              url: '#/ReportsFinancials',
              priority: 3
            }
          ]
        }
      ],
      "Report Tester": [
        {
          label: 'Reports',
          priority: 7,
          iconClasses: 'glyphicon glyphicon-print',
          children: [
            {
              label: 'Reports',
              url: '#/RW_Generator',
              priority: 2
            },
            {
              label: 'Financials',
              url: '#/ReportsFinancials',
              priority: 2
            }
          ]
        }
      ]
    };

    //Update Menu
    function updateMenu (roles) {

      function isItemExists (itemLabel) {
        var result = false;
        angular.forEach($scope.menu, function(menuItem){
          if(menuItem.label == itemLabel.label) {
            result = true;
          }
        });
        return result;
      }

      function isSubItemExists (menuItem, child) {
        var result = false;
        angular.forEach(menuItem.children, function(menuChild) {
          if(menuChild.label == child.label) {
            result = true;
          }
        });
        return result;
      }

      $scope.menu = [];
      for(var role in roles) {
        angular.forEach(menus[role], function(menuItem) {

          if(!isItemExists(menuItem)) {

            var newMenuItem = {
              label: menuItem.label,
              priority: menuItem.priority,
              iconClasses: menuItem.iconClasses,
              url: menuItem.url
            };

            if(menuItem.children && menuItem.children.length) {
              newMenuItem.children = [];

              angular.forEach(menuItem.children, function (childItem) {
                if (!isSubItemExists(newMenuItem, childItem)) {
                  newMenuItem.children.push(childItem);
                }
              });

            }

            $scope.menu.push(newMenuItem);

          } else {

            //else add children
            var currentScopeMenuItem;
            angular.forEach($scope.menu, function(scopeMenuItem) {
              if(scopeMenuItem.label == menuItem.label) {
                currentScopeMenuItem = scopeMenuItem;
              }
            });

            if(menuItem.children) {
              angular.forEach(menuItem.children, function(childItem) {
                if(!isSubItemExists(currentScopeMenuItem, childItem)) {
                  currentScopeMenuItem.children.push(childItem);
                }
              });
            }

          }
        });
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
