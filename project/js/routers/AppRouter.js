define([
  'jquery',
  'backbone',
  '../views/HomeView',
  '../views/MovieDetailsView',
  '../views/TopRatedView',
  '../views/UpcomingView',
], function($, Backbone) {
  var ApplicationRouter = Backbone.Router.extend({

    routes: {
      '': 'home',
      'now_playing': 'home',
      'top_rated': 'top_rated',
      'upcoming': 'upcoming',

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

    top_rated: function() {
      console.log('#top_rated');
      this.changePage(new TopRatedView());
    },

    upcoming: function() {
      console.log('#upcoming');
      this.changePage(new UpcomingView());
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
