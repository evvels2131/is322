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

      'search/:query': 'search',
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
      console.log('#movie/' + id);
      this.changePage(new MovieDetailsView({ id: id }));
    },

    // Person Details Page
    person: function(id) {
      console.log('#person/' + id);
      this.changePage(new PersonView({ id: id }));
    },

    search: function(query) {
      console.log('#search/' + query);
      this.changePage(new SearchView({ query: query }));
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
      // Change navigation bar's elements from active to not active when appropriate
      $(function() {
        $('[data-role="navbar"]').navbar();
        $('[data-role="footer"]').navbar();
      });

      $(document).on('pagecontainerchange', function() {
        var current = document.location.href.substring(32 + 8, document.location.href.length);
        $('[data-role="navbar"] a.ui-btn-active').removeClass('ui-btn-active');
        $('[data-role="navbar"] a').each(function() {
          var href = $(this).prop('href');
          if (href.indexOf(current, href.length - current.length) !== -1) {
            $(this).addClass('ui-btn-active');
          }
        });
      });

      // Display the navigation bar on certain pages, whenever necessary
      $(function() {
        if (document.location.href.indexOf('#movie') !== -1 ||
            document.location.href.indexOf('#person') !== -1) {
          $('[data-role="footer"]').css('display', 'none');
        } else {
          $('[data-role="footer"]').css('display', 'block');
        }
      });

      $('body').prepend($(page.el));
      $('#page-content').prepend($(page.el));
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
