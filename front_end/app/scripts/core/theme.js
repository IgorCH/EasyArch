angular
  .module('theme', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'ui.sortable',
    'easypiechart',
    'NgSwitchery',
    'sun.scrollable',
    'ui.bootstrap',
    'ui.select',

    'theme.core.templates',
    'theme.core.template_overrides',
    'theme.core.panels',
    'theme.core.directives',
    'theme.core.main_controller',
    'theme.core.navigation_controller',
    'theme.core.notifications_controller',
    'theme.core.messages_controller',

    'theme.core.home_controller',
    'theme.core.login_controller',
    'theme.core.rw_cpanel_controller',
    'theme.core.rw_generator_controller',
    'theme.core.rw_resPopup_controller'
  ]);