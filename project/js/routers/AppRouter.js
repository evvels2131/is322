define([
  'jquery',
  'backbone',
  '../views/HomeView',
  '../views/MovieDetailsView',
  '../views/TopRatedView',
  '../views/UpcomingView',
  '../views/SearchView',
  '../views/TheatersView',
], function($, Backbone) {
  var ApplicationRouter = Backbone.Router.extend({

    routes: {
      '': 'home',
      'now_playing': 'home',
      'top_rated': 'top_rated',
      'upcoming': 'upcoming',

      'movie/:id': 'movie',

      'search': 'search',
      'theaters': 'theaters',
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
      console.log('#movie/:id');
      this.changePage(new MovieDetailsView({ id: id }));
    },

    search: function() {
      console.log('#search');
      this.changePage(new SearchView());
    },

    theaters: function() {
      console.log('#theaters');
      this.changePage(new TheatersView());
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
