define([
  'underscore',
  'backbone',
  'models/MovieModel'
], function(_, Backbone, MovieModel) {

  var DiscoverMoviesCollection = Backbone.Collection.extend({

    model: MovieModel,

    initialize: function(options) {
      this.genres = options.genres;
      this.actors = options.actors;
      this.page = options.page;
      this.optional_parameters = '&with_genres=' + this.genres +
       '&sort_by=vote_average.asc&language=en&with_cast=' + this.actors + '&page=' +
       this.page;
    },

    url: function() {
      return 'https://api.themoviedb.org/3/discover/movie?api_key=9253b5607c386360d241ec304c9e1520' +
       this.optional_parameters;
    },

    parse: function(response) {
      return response.results;
    }
  });

  return DiscoverMoviesCollection;
});
