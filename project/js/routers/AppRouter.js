define([
  'jquery',
  'backbone',
  '../views/HomeView',
  '../views/MovieDetailsView',
  '../views/PersonView',
  '../views/SearchView',
  '../views/TheatersView',
  '../views/DiscoverView'
], function($, Backbone) {
  var ApplicationRouter = Backbone.Router.extend({

    routes: {
      '': 'home',
      'home/:category': 'home',

      'movie/:id': 'movie',
      'person/:id': 'person',

      'search': 'search',
      'theaters': 'theaters',
      'discover': 'discover'
    },

    initialize: function() {
      $('body').on('click', '#back', function() {
        window.history.back();
      });
      this.firstPage = true;
    },

    home: function(category) {
      console.log('#home');
      console.log(category);
      this.changePage(new HomeView({ category: category }));
    },

    // Movie Details Page
    movie: function(id) {
      console.log('#movie/:id');
      this.changePage(new MovieDetailsView({ id: id }));
    },

    // Person Details Page
    person: function(id) {
      console.log('#person/' + id);
      this.changePage(new PersonView({ id: id }));
    },

    search: function() {
      console.log('#search');
      this.changePage(new SearchView());
    },

    theaters: function() {
      console.log('#theaters');
      this.changePage(new TheatersView());
    },

    discover: function() {
      console.log('#discover');
      this.changePage(new DiscoverView());
    },

    changePage: function(page) {
      $(page.el).attr('data-role', 'page');
      page.render();
      $('body').append($(page.el));
      var transition = 'none';
      //var transition = $.mobile.defaultPageTransition;

      if (this.firstPage) {
        transition = 'none';
        this.firstPage = false;
      }

      $.mobile.changePage($(page.el), { changeHash: false, transition: transition });
    }
  });

  return ApplicationRouter;
});
