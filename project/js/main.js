require.config({

  //urlArgs: 'bust=' + (new Date()).getTime(),

  paths: {
    'jquery': 'libs/jquery/jquery',
    'jquerymobile': 'libs/jquerymobile/jquerymobile',
    'underscore': 'libs/underscore/underscore',
    'backbone': 'libs/backbone/backbone',
    'templates': '../templates'
  },

  // Set the configuration for third party scripts that are not AMD
  // compatible
  shim: {
    'backbone': {
      'deps': ['underscore', 'jquery'],
      'exports': 'Backbone'
    }
  }
});

// Includes file dependencies
require([
  'jquery',
  'backbone',
  'routers/AppRouter'
], function($, Backbone, AppRouter) {
  $(document).on('mobileinit', function() {
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
  });

  require(['jquerymobile'], function() {
    this.router = new AppRouter();
    Backbone.history.start();
  });
});
