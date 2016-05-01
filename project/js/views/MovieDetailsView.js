define([
  'jquery',
  'underscore',
  'backbone',
  'models/MovieDetailsModel',
  'text!templates/movie/MovieDetailsTemplate.html',
  'text!templates/movie/DetailedMovieTemplate.html'
], function($, _, Backbone, MovieDetailsModel, movieDetailsTemplate,
    detailedMovieTemplate) {

  window.MovieDetailsView = Backbone.View.extend({

    template: _.template(movieDetailsTemplate),

    initialize: function(options) {
      console.log('MovieDetailsView Initialized');
      var self = this;

      this.content = 'undefined';

      this.model = new MovieDetailsModel({
        id: this.id
      });

      this.model.on('change', this.render, this);

      this.render();
    },

    events: {
      'click #add_to_fav': 'addToFavorites',
      'click #remove_from_fav': 'removeFromFavorites'
    },

    render: function() {
      var self = this;

      var template = _.template(detailedMovieTemplate);

      this.model.fetch({
        success: function(reponse) {
          // Check if the movie is in favorites then set appropriate values
          if (self.checkIfFavorite(self.model.get('id'))) {
            self.model.set('isFavorite', true);
          } else {
            self.model.set('isFavorite', false);
          }

          // Grab the trailer source if exists
          var trailer_source;
          if (self.model.attributes.trailers.youtube.length == 1) {
            trailer_source = self.model.attributes.trailers.youtube[0].source;
          }

          self.content = template({
            original_title: self.model.get('original_title'),
            overview: self.model.get('overview'),
            release_date: self.model.get('release_date'),
            is_favorite: self.model.get('isFavorite'),
            trailer_source: trailer_source,
            similar: self.model.get('similar'),
            credits: self.model.get('credits'),
            poster: self.model.get('poster_path'),
            genres: self.model.get('genres'),
            production_companies: self.model.get('production_companies'),
            production_countries: self.model.get('production_countries'),
            runtime: self.model.get('runtime')
          });

          $(self.el).html(self.template({
            isFavorite: self.model.get('isFavorite'),
            content: self.content
          }));

          $(self.el).trigger('create');
        },
        error: function(error) {
          console.log('Error ' + error);
          $(self.el).html(self.template({
            content: self.content
          }));
        }
      });

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
    },



    addToFavorites: function(e) {
      e.preventDefault();

      // Set the isFavorite attribute to true
      this.model.set('isFavorite', true);

      // Grab movie id
      var movie_id = this.model.get('id');

      console.log(movie_id);

      // Grab genre ids if existent
      var genres_ids = [];
      if (this.model.get('genres').length > 0) {
        for (var i = 0; i < this.model.get('genres').length; i++) {
          genres_ids[i] = this.model.get('genres')[i].id;
        }
      }
      console.log(genres_ids);

      // Grab actors ids if existent
      var actors_ids = [];
      if (this.model.get('credits').cast.length > 2) {
        for (var i = 0; i < 2; i++) {
          actors_ids[i] = this.model.get('credits').cast[i].id;
        }
      }

      console.log(actors_ids);

      saveToLocalStorage(movie_id, genres_ids, actors_ids);

      function saveToLocalStorage(movie, genres, actors) 
      {
        console.log(movie);
        console.log(genres);
        console.log(actors);
        // Arrays that will hold information about movies, genres, and actors
        // stored in local storage
        var moviesLS = [];
        var genresLS = [];
        var actorsLS = [];

        // Check if local storage is set
        if (localStorage.getItem('fav-movies') == null ||
            localStorage.getItem('fav-genres') == null ||
            localStorage.getItem('fav-actors') == null) {
          // Set the local storage for appropriate information
          localStorage.setItem('fav-movies', JSON.stringify(moviesLS));
          localStorage.setItem('fav-genres', JSON.stringify(genresLS));
          localStorage.setItem('fav-actors', JSON.stringify(actorsLS));
        }

        // Add information about a movie to local storage making sure that it has
        // not been already added
        moviesLS = JSON.parse(localStorage.getItem('fav-movies'));
        if (moviesLS.indexOf(movie) === -1) {
          moviesLS.push(movie);
          localStorage.setItem('fav-movies', JSON.stringify(moviesLS));
          console.log('added a movie id');
        }

        // Check if there are any genres available, if so, store them in local storage
        if (genres.length > 0) {
          genresLS = JSON.parse(localStorage.getItem('fav-genres'));

          for (var i = 0; i < genres.length; i++) {
            if (genresLS.indexOf(genres[i]) === -1) {
              genresLS.push(genres[i]);
              localStorage.setItem('fav-genres', JSON.stringify(genresLS));
              console.log('added genres');
            }
          }
        }

        // Check if there are any actors available, if so, store them in local storage
        if (actors.length > 0) {
          actorsLS = JSON.parse(localStorage.getItem('fav-actors'));

          for (var i = 0; i < 2; i++) {
            if (actorsLS.indexOf(actors[i]) === -1) {
              actorsLS.push(actors[i]);
              localStorage.setItem('fav-actors', JSON.stringify(actorsLS));
              console.log('added an actor');
            }
          }
        }
      }
    },

    removeFromFavorites: function(e) {
      e.preventDefault();
      // Set the isFavorite attribute to false
      this.model.set('isFavorite', false);

      var genres_array = [];

      // Check if there are any genre ids available, if so, store them in an array
      if (this.model.get('genres').length > 0) {
        var genres = this.model.get('genres');

        for (var i = 0; i < genres.length; i++) {
          genres_array[i] = genres[i].id;
        }
      }

      localStorageRemove(this.model.get('id'), genres_array);

      function localStorageRemove(movie_id, genre_ids)
      {
        // Check if local storage is set for favorite movies and genres
        if (localStorage.getItem('fav-movies') != null || localStorage.getItem('fav-genres') != null)
        {
          var movie_array = [];
          var genre_array = [];

          movie_array = JSON.parse(localStorage.getItem('fav-movies'));

          // Check if the movie id is stored in local storage
          if (movie_array.indexOf(movie_id) !== -1) {
            var index = movie_array.indexOf(movie_id);
            movie_array.splice(index, 1);
            localStorage.setItem('fav-movies', JSON.stringify(movie_array));
            console.log('Movie removed from the fav-movies');
          }

          // If there are any genre ids available, delete them
          if (genre_ids.length > 0) {
            genre_array = JSON.parse(localStorage.getItem('fav-genres'));

            for (var i = 0; i < genre_ids.length; i++) {
              if (genre_array.indexOf(genre_ids[i]) !== -1) {
                var index = genre_array.indexOf(genre_ids[i]);
                genre_array.splice(index, 1);
                localStorage.setItem('fav-genres', JSON.stringify(genre_array));
                console.log('Genre id was removed from the fav-genres');
              }
            }
          }
        }
      }
    }
  });
});
