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

      var apiString = getApiParameters('fav-genres', 2);
      console.log(apiString);

      function getApiParameters(localStorageItem, numOfIds) {
        console.log(String(localStorageItem));
        var ls = "'" + localStorageItem + "'";
        var ls = '"' + localStorageItem + '"';
        var result = [];
        var api_string = '';
        console.log(ls);

        console.log(localStorage.getItem(ls));
  
        // Check if the local storage item exists
        if (localStorage.getItem(ls) != null) {
          localStorageResult = JSON.parse(localStorage.getItem(ls));
          console.log(localStorageResult);

          if (localStorageResult.length > 0) {
            // Pick the amount of ids specified
            result = [];
            if (localStorageResult.length > numOfIds) {
              for (var i = 0; i < numOfIds; i++) {
                result[i] = localStorageResult[Math.floor(Math.random() * localStorageResult.length)];
              }
            } else {
              for (var i = 0; i < localStorageResult.length; i++) {
                result[i] = localStorageResult[i];
              }
            }

            // Convert the result into an API string
            for (var i = 0; result.length; i++) {
              if (result.indexOf(result[i]) < result.length - 1) {
                api_string = api_string.concat(result[i] + ',');
              } else {
                api_string = api_string(concat(result[i]));
              }
            }
          }
        } else {
          console.log('tits');
        }
        return api_string;
      }


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

      var actors_string = '';
      // Check if there are any actors available
      if (localStorage.getItem('fav-actors') != null) {
        var actors = JSON.parse(localStorage.getItem('fav-actors'));

        if (actors.length > 0) {
          var result = [];
          if (actors.length > 4) {
            for (var i = 0; i < 4; i++) {
              result[i] = actors[Math.floor(Math.random() * actors.length)];
            }
          } else {
            for (var i = 0; i < actors.length; i++) {
              result[i] = actors[i];
            }
          }

          // Convert the array into a string for the API request
          for (var i = 0; i < result.length; i++) {
            if (result.indexOf(result[i]) < result.length - 1) {
              actors_string = actors_string.concat(result[i] + '|');
            } else {
              actors_string = actors_string.concat(result[i]);
            }
          }
        }
      }

      console.log(actors_string);

      // If favorite genres are available in the local storage,
      // get the collection and display it to the user
      if (this.favorites_exist) {
        this.genres = genres_string;
        this.actors = actors_string;

        this.discoverMoviesCollection = new DiscoverMoviesCollection({
          genres: this.genres,
          actors: this.actors,
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
