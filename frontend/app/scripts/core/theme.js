angular
  .module('theme', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'ngStorage',
    'angular-lodash',
    'ui.sortable',
    'easypiechart',
    'NgSwitchery',
    'sun.scrollable',
    'ui.bootstrap',
    'ui.select',
    'ui.router',

    //Page Directives
    'theme.core.templates',
    'theme.core.template_overrides',
    'theme.core.panels',
    'theme.core.directives',
    'theme.core.sd_grid',
    'theme.core.cr_numeric',
    'ui-select-infinity',
    'theme.core.stop_propagation',

    //Page Controllers
    'theme.core.main_controller',
    'theme.core.navigation_controller',
    'theme.core.notifications_controller',
    //'theme.core.messages_controller',

    'theme.core.landing_controller',
    'theme.core.profile_controller',
    'theme.core.login_controller',
    'theme.core.signup_controller',

    'theme.core.file_upload_controller',

    'theme.core.models_controller',
    'theme.core.models_upload_controller',

    'theme.core.projects_controller',
    'theme.core.task_controller',

    'theme.core.rest_helper',
    'theme.core.project_data_source'

  ]);
