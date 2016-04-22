define([
  'jquery',
  'underscore',
  'backbone',
  'collections/DiscoverMoviesCollection',
  'view/movies/MoviesView'
], function($, _, Backbone, DiscoverMoviesCollection, MoviesView) {

  window.DiscoverView = Backbone.View.extend({

    template: _.template($('#discover').html()),

    initialize: function() {
      console.log('DiscoverView Initialized');

      this.content = 'undefined';
      this.page = 1;
      var genre_ids = [];
      var genres_string = '';

      // Check if genres available in local storage
      if (localStorage.getItem('fav-genres') != null) {
        genre_ids = JSON.parse(localStorage.getItem('fav-genres'));

        for (var i = 0; i < genre_ids.length; i++) {
          if (genre_ids.indexOf(genre_ids[i]) < genre_ids.length - 1) {
            genres_string = genres_string.concat(genre_ids[i] + '|');
          } else {
            genres_string = genres_string.concat(genre_ids[i]);
          }
        }
      }

      this.genres = genres_string;

      this.discoverMoviesCollection = new DiscoverMoviesCollection({
        genres: this.genres,
        page: this.page
      });

      this.moviesView = new MoviesView({
        collection: this.discoverMoviesCollection
      });

      this.render();
    },

    render: function() {
      var self = this;
    }
  });
});
