define([
  'jquery',
  'underscore',
  'backbone',
  'collections/DiscoverMoviesCollection',
  'views/movies/MoviesView',
  'text!templates/DiscoverViewTemplate.html'
], function($, _, Backbone, DiscoverMoviesCollection, MoviesView, discoverViewTemplate) {

  window.DiscoverView = Backbone.View.extend({

    template: _.template(discoverViewTemplate),

    initialize: function() {
      console.log('DiscoverView Initialized');

      this.content = 'undefined';
      this.favorites_exist = false;
      this.page = 1;
      var genre_ids = [];
      var genres_string = '';

      // Check if genres available in local storage
      if (localStorage.getItem('fav-genres') != null) {
        genre_ids = JSON.parse(localStorage.getItem('fav-genres'));

        if (genre_ids.length > 0) {
          this.favorites_exist = true;

          // If it has multiple genre ids, pick 2 at random for better recommendations
          var arr_result = [];
          if (genre_ids.length > 2) {
            for (var i = 0; i < 2; i++) {
              arr_result[i] = genre_ids[Math.floor(Math.random() * genre_ids.length)];
            }
          } else {
            for (var i = 0; i < genre_ids.length; i++) {
              arr_result[i] = genre_ids[i];
            }
          }

          // Convert the array into a string for the AJAX request
          for (var i = 0; i < arr_result.length; i++) {
            if (arr_result.indexOf(arr_result[i]) < arr_result.length - 1) {
              genres_string = genres_string.concat(arr_result[i] + ',');
            } else {
              genres_string = genres_string.concat(arr_result[i]);
            }
          }
        }
      }

      // If favorite genres are available in the local storage,
      // get the collection and display it to the user
      if (this.favorites_exist) {
        this.genres = genres_string;

        this.discoverMoviesCollection = new DiscoverMoviesCollection({
          genres: this.genres,
          page: this.page
        });

        this.moviesView = new MoviesView({
          collection: this.discoverMoviesCollection
        });
      }

      this.render();
    },

    render: function() {
      var self = this;

      if (this.favorites_exist) {
        this.discoverMoviesCollection.fetch({
          success: function() {
            self.content = self.moviesView.render().el.outerHTML;
            $(self.el).html(self.template({
              content: self.content
            }));
            $(self.el).trigger('create');
          },

          error: function(error) {
            $(self.el).html(self.template({
              content: self.content
            }));
            $(self.el).trigger('create');
            console.log('Error: ' + error);
          }
        });
      } else {
        $(this.el).html(self.template({
          content: this.content
        }));
      }

      return this;
    }
  });
});
