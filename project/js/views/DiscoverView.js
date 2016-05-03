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
      this.favGenresLS = this.getFavoritesLS('fav-genres', 2, ',');
      this.favActorsLS = this.getFavoritesLS('fav-actors', 4, '|');

      // If favorite genres are available in the local storage,
      // get the collection and display it to the user
      if (this.favGenresLS != '' || this.favActorsLS != '') {
        this.favorites_exist = true;
        this.genres = this.favGenresLS;
        this.actors = this.favActorsLS;

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
    },

    getFavoritesLS: function(lsItem, numOfItems, char) {
        var ls;
        var api = '';
        var result = [];
        
        switch (lsItem) {
          case 'fav-genres':
            ls = localStorage.getItem('fav-genres');
            break;
          case 'fav-actors':
            ls = localStorage.getItem('fav-actors');
            break;
        }

        if (ls != null) {
          lsResults = JSON.parse(ls);

          if (lsResults.length > 0)
          {
            // Pick the amount of items specified
            if (lsResults.length > numOfItems) {
              for (var i = 0; i < numOfItems; i++) {
                result[i] = lsResults[Math.floor(Math.random() * lsResults.length)];
              }
            } else {
              for (var i = 0; i < lsResults.length; i++) {
                result[i] = lsResults[i];
              }
            }
          }

          // Convert it into an appropriate API string
          for (var i = 0; i < result.length; i++) {
            if (result.indexOf(result[i]) < result.length - 1) {
              api = api.concat(result[i] + char);
            } else {
              api = api.concat(result[i]);
            }
          }
        }
        return api;
    }
  });
});
