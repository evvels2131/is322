define([
  'jquery',
  'backbone',
  '../views/HomeView',
  '../views/Page1View'
], function($, Backbone, ListView) {
  var ApplicationRouter = Backbone.Router.extend({

    routes: {
      '': 'home',
      'page1': 'page1'
    },

    initialize: function() {
      $('.back').live('click', function(event) {
        window.history.back();
        return false;
      });
      this.firstPage = true;
    },

    home: function() {
      console.log('#home');
      this.changePage(new HomeView());
    },

    page1: function() {
      console.log('#page1');
      this.changePage(new Page1View());
    },

    changePage: function(page) {
      $(page.el).attr('data-role', 'page');
      page.render();
      $('body').append($(page.el));
      var transition = $.mobile.defaultPageTransition;

      if (this.firstPage) {
        transition = 'none';
        this.firstPage = false;
      }

      $.mobile.changePage($(page.el), { changeHash: false, transition: transition });
    }
  });

  return ApplicationRouter;
});
