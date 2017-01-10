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
        var indexOfProject = document.location.href.indexOf('project');
        var currPage = document.location.href;
        var currentPage = document.location.href.substring(indexOfProject + 8, document.location.href.length);

        if (currentPage.indexOf('/') !== -1) {
          currentPage = currentPage.substring(0, currentPage.indexOf('/'));
        }

        $('[data-role="navbar"] a.ui-btn-active').removeClass('ui-btn-active');
        $('[data-role="navbar"] a').each(function() {
          var href = $(this).prop('href');

          var indexOfProject = href.indexOf('project');
          var new_href = href.substring(indexOfProject + 8, href.length);
          if (new_href.indexOf('/') !== -1) {
            new_href = new_href.substring(0, new_href.indexOf('/'));
          }

          if (currPage.indexOf('#home/') !== -1) {
            if (new_href == '#') {
              $(this).addClass('ui-btn-active');
            }
          }

          if (currentPage == new_href) {
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

      $('#page-content').prepend($(page.el));

      $.mobile.pageContainer.pagecontainer('change', $(page.el), {
        changeHash: false,
        transition: 'none'
      });
    }
  });

  return ApplicationRouter;
});
