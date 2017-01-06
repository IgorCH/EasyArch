angular
  .module('theme.core.session', [])
  .service('Session', function () {


    var Session = {
      state: {}
    };

    return Session;
  });