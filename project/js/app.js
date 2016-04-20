define({
  'jquery',
  'jquery-mobile',
  'underscore',
  'backbone',
  'router',
}, function($, _, jQueryMobile, Backbone, Router) {
  var initialize = function() {
    Router.initialize();
  }

  return {
    initialize: initialize
  };
});
