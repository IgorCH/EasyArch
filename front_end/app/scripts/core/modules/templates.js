/* jshint ignore:start */
angular.module('theme.core.templates', []).run(['$templateCache', function ($templateCache) {
  'use strict';

  $templateCache.put('templates/contextual-progressbar.html',
    "<div class=\"contextual-progress\">\r" +
    "\n" +
    "\t<div class=\"clearfix\">\r" +
    "\n" +
    "\t\t<div class=\"progress-title\">{{heading}}</div>\r" +
    "\n" +
    "\t\t<div class=\"progress-percentage\">{{percent | number:0}}%</div>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "\t<div class=\"progress\">\r" +
    "\n" +
    "\t\t<div class=\"progress-bar\" ng-class=\"type && 'progress-bar-' + type\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: percent + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" ng-transclude></div>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('templates/custom-styles.html',
    "<style>\r" +
    "\n" +
    "\t.dropdown.open .dropdown-menu.animated {\r" +
    "\n" +
    "\t\t-webkit-animation-name: {{getLayoutOption('dropdownTransitionStyle')}};\r" +
    "\n" +
    "\t\tanimation-name: {{getLayoutOption('dropdownTransitionStyle')}};\r" +
    "\n" +
    "\t\t-webkit-animation-duration: .5s;\r" +
    "\n" +
    "\t\tanimation-duration: .5s;\r" +
    "\n" +
    "\t}\r" +
    "\n" +
    "\t.dropdown-menu.animated {\r" +
    "\n" +
    "\t\t-webkit-animation-name: none;\r" +
    "\n" +
    "\t\tanimation-name: none;\r" +
    "\n" +
    "\t}\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t.mainview-animation.animated.ng-enter {\r" +
    "\n" +
    "\t\t-webkit-animation-name: {{getLayoutOption('pageTransitionStyle')}};\r" +
    "\n" +
    "\t\tanimation-name: {{getLayoutOption('pageTransitionStyle')}};\r" +
    "\n" +
    "\t}\r" +
    "\n" +
    "</style>"
  );


  $templateCache.put('templates/nav_renderer_horizontal.html',
    "<a ng-click=\"select(item)\" ng-href=\"{{item.url}}\">\r" +
    "\n" +
    "  <i ng-if=\"item.iconClasses\" class=\"{{item.iconClasses}}\"></i><span>{{item.label}}</span>\r" +
    "\n" +
    "  <span ng-bind-html=\"item.html\"></span>\r" +
    "\n" +
    "</a>\r" +
    "\n" +
    "<ul ng-if=\"item.children.length\">\r" +
    "\n" +
    "    <li ng-repeat=\"item in item.children\"\r" +
    "\n" +
    "      ng-class=\"{ hasChild: (item.children!==undefined),\r" +
    "\n" +
    "                      active: item.selected,\r" +
    "\n" +
    "                        open: (item.children!==undefined) && item.open }\"\r" +
    "\n" +
    "      ng-include=\"'templates/nav_renderer_horizontal.html'\"\r" +
    "\n" +
    "    ></li>\r" +
    "\n" +
    "</ul>\r" +
    "\n"
  );


  $templateCache.put('templates/nav_renderer.html',
    "<div ng-if=\"item.separator==true\">\r" +
    "\n" +
    "\t<span>{{item.label}}</span>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<a ng-if=\"!item.separator\" ng-click=\"select(item)\" ng-href=\"{{item.url}}\">\r" +
    "\n" +
    "\t<i ng-if=\"item.iconClasses\" class=\"{{item.iconClasses}}\"></i><span>{{item.label}}</span>\r" +
    "\n" +
    "\t<span ng-bind-html=\"item.html\"></span>\r" +
    "\n" +
    "</a>\r" +
    "\n" +
    "<ul ng-if=\"item.children.length\" data-slide-out-nav=\"item.open || (searchQuery.length>0 && item.selected)\">\r" +
    "\n" +
    "    <li ng-repeat=\"item in item.children\"\r" +
    "\n" +
    "\t    ng-class=\"{ hasChild: (item.children!==undefined),\r" +
    "\n" +
    "                      active: item.selected,\r" +
    "\n" +
    "                        open: (item.children!==undefined) && item.open,\r" +
    "\n" +
    "              'search-focus': (searchQuery.length>0 && item.selected) }\"\r" +
    "\n" +
    " \t\tng-show=\"!(searchQuery.length>0 && !item.selected)\"\r" +
    "\n" +
    "    \tng-include=\"'templates/nav_renderer.html'\"\r" +
    "\n" +
    "    ></li>\r" +
    "\n" +
    "</ul>"
  );


  $templateCache.put('templates/panel-tabs-without-heading.html',
    "<div class=\"panel {{panelClass}}\">\r" +
    "\n" +
    "  <div class=\"panel-heading\" ng-attr-ng-drag-handle=\"{{draggable}}\">\r" +
    "\n" +
    "        <h2>\r" +
    "\n" +
    "            <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\r" +
    "\n" +
    "        </h2>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div class=\"panel-body\">\r" +
    "\n" +
    "    <div class=\"tab-content\">\r" +
    "\n" +
    "        <div class=\"tab-pane\"\r" +
    "\n" +
    "            ng-repeat=\"tab in tabs\"\r" +
    "\n" +
    "            ng-class=\"{active: tab.active}\"\r" +
    "\n" +
    "            tab-content-transclude=\"tab\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('templates/panel-tabs.html',
    "<div class=\"panel {{panelClass}}\">\r" +
    "\n" +
    "  <div class=\"panel-heading\" ng-attr-ng-drag-handle=\"{{draggable}}\">\r" +
    "\n" +
    "        <h2><i ng-if=\"panelIcon\" class=\"{{panelIcon}}\"></i>{{(panelIcon? \" \":\"\")+heading}}</h2>\r" +
    "\n" +
    "        <div class=\"panel-ctrls\">\r" +
    "\n" +
    "            <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div class=\"panel-body\">\r" +
    "\n" +
    "    <div class=\"tab-content\">\r" +
    "\n" +
    "        <div class=\"tab-pane\"\r" +
    "\n" +
    "            ng-repeat=\"tab in tabs\"\r" +
    "\n" +
    "            ng-class=\"{active: tab.active}\"\r" +
    "\n" +
    "            tab-content-transclude=\"tab\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('templates/panel.html',
    "<div class=\"panel {{panelClass}}\">\r" +
    "\n" +
    "  <div class=\"panel-heading\">\r" +
    "\n" +
    "        <h2><i ng-if=\"panelIcon\" class=\"{{panelIcon}}\"></i>{{(panelIcon? \" \":\"\")+heading}}</h2>\r" +
    "\n" +
    "        <div class=\"panel-ctrls\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div class=\"panel-body\" ng-transclude>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('templates/themed-tabs-bottom.html',
    "<div class=\"tab-container tab-{{theme || 'primary'}} tab-{{position || 'normal'}}\">\r" +
    "\n" +
    "  <div class=\"tab-content\">\r" +
    "\n" +
    "    <div class=\"tab-pane\"\r" +
    "\n" +
    "        ng-repeat=\"tab in tabs\"\r" +
    "\n" +
    "        ng-class=\"{active: tab.active}\"\r" +
    "\n" +
    "        tab-content-transclude=\"tab\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('templates/themed-tabs.html',
    "<div class=\"tab-container tab-{{theme || 'primary'}} tab-{{position || 'normal'}}\">\r" +
    "\n" +
    "  <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\r" +
    "\n" +
    "  <div class=\"tab-content\">\r" +
    "\n" +
    "    <div class=\"tab-pane\"\r" +
    "\n" +
    "        ng-repeat=\"tab in tabs\"\r" +
    "\n" +
    "        ng-class=\"{active: tab.active}\"\r" +
    "\n" +
    "        tab-content-transclude=\"tab\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('templates/tile-generic.html',
    "<div class=\"info-tiles tiles-{{type}}\">\r" +
    "\n" +
    "\t<div class=\"tiles-heading\">\r" +
    "\n" +
    "\t\t{{heading}}\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "\t<div class=\"tiles-body\" ng-transclude>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('templates/tile-large.html',
    "<a class=\"info-tiles tiles-{{item.color}}\" ng-href=\"{{item.href}}\">\r" +
    "\n" +
    "    <div class=\"tiles-heading\">\r" +
    "\n" +
    "        <div class=\"pull-left\">{{item.title}}</div>\r" +
    "\n" +
    "        <div class=\"pull-right\">{{item.titleBarInfo}}</div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"tiles-body\">\r" +
    "\n" +
    "        <div class=\"pull-left\"><i class=\"{{item.classes}}\"></i></div>\r" +
    "\n" +
    "        <div class=\"pull-right\" ng-show=\"item.text\">{{item.text}}</div>\r" +
    "\n" +
    "        <div class=\"pull-right\" ng-show=\"!item.text\" ng-transclude></div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</a>\r" +
    "\n"
  );


  $templateCache.put('templates/tile-shortcut.html',
    "<a class=\"shortcut-tiles tiles-{{item.color}}\" ng-href=\"{{item.href}}\">\r" +
    "\n" +
    "\t<div class=\"tiles-body\">\r" +
    "\n" +
    "\t\t<div class=\"pull-left\"><i class=\"{{item.classes}}\"></i></div>\r" +
    "\n" +
    "\t\t<div class=\"pull-right\"><span class=\"badge\">{{item.titleBarInfo}}</span></div>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "\t<div class=\"tiles-footer\">\r" +
    "\n" +
    "\t\t{{item.text}}\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</a>\r" +
    "\n"
  );


  $templateCache.put('templates/tile-simple.html',
    "<a class=\"info-tiles tiles-{{item.color}}\" ng-href=\"{{item.href}}\">\r" +
    "\n" +
    "    <div class=\"tiles-heading\">\r" +
    "\n" +
    "        <div class=\"text-center\">{{item.title}}</div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"tiles-body\">\r" +
    "\n" +
    "        <div class=\"text-center\" ng-show=\"item.text\">{{item.text}}</div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</a>"
  );
}])
/* jshint ignore:end */