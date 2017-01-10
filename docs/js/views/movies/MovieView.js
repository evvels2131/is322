define([
  'jquery',
  'underscore',
  'backbone',
  'text!../../templates/movie/MovieTemplate.html'
], function($, _, Backbone, movieTemplate) {
  var MovieView = Backbone.View.extend({

    tagName: 'li',

    attributes: {
      'data-icon': 'false'
    },

    template: _.template(movieTemplate),

    render: function() {

      // Check if the movie is in favorites then set appropriate values
      if (this.checkIfFavorite(this.model.get('id'))) {
        this.model.set('isFavorite', true);
      } else {
        this.model.set('isFavorite', false);
      }

      $(this.el).html(this.template({
        isFavorite: this.model.get('isFavorite'),
        original_title: this.model.get('original_title'),
        poster_path: this.model.get('poster_path'),
        vote_average: this.model.get('vote_average'),
        release_date: this.model.get('release_date'),
        id: this.model.get('id')
      }));

      return this;
    },

    checkIfFavorite: function(movie_id) {
      var isFavorite = false;
      var movie_array = [];

      // Check the local storage
      if (localStorage.getItem('fav-movies') == null) {
        console.log('Local storage not yet set for favorite movies');
      } else {
        movie_array = JSON.parse(localStorage.getItem('fav-movies'));

        // Check if movie id is already stored in the favorites
        if (movie_array.indexOf(movie_id) !== -1) {
          isFavorite = true;
        }
      }
      return isFavorite;
    }
  });

  return MovieView;
});
