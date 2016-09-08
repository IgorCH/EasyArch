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
      'theme.core.signup_controller',

      'theme.core.service_controller',
      'theme.core.portfolio_controller',
      'theme.core.contacts_controller',
      'theme.core.help_controller',
      'theme.core.projects_controller',
      'theme.core.new_project_controller',

      'theme.core.tasks_controller',
      'theme.core.new_task_controller',
      'theme.core.models_controller',
      'theme.core.scenes_controller'



  ]);
