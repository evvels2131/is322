define([
  'jquery',
  'backbone',
  '../views/HomeView',
  '../views/MovieDetailsView'
], function($, Backbone) {
  var ApplicationRouter = Backbone.Router.extend({

    routes: {
      '': 'home',

      'movie/:id': 'movie'
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

    // Movie Details Page
    movie: function(id) {
      this.changePage(new MovieDetailsView({ id: id }));
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
