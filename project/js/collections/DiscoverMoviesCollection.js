define([
  'underscore',
  'backbone',
  'models/MovieModel'
], function(_, Backbone, MovieModel) {

  var DiscoverMoviesCollection = Backbone.Collection.extend({

    model: MovieModel,

    initialize: function(options) {
      this.genres = options.genres;
      this.page = options.page;
      this.optional_parameters = '&with_genres=' + this.genres +
       '&sort_by=vote_average.desc&primary_release_date.gte=2014-01-01&primary_release_date.lte=2017-01-01&page=' +
       this.page;
    },

    url: function() {
      return 'http://api.themoviedb.org/3/discover/movie?api_key=9253b5607c386360d241ec304c9e1520' +
       this.optional_parameters;
    },

    parse: function(response) {
      return response.results;
    }
  });

  return DiscoverMoviesCollection;
});
