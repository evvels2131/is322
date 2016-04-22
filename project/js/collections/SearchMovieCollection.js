define([
  'underscore',
  'backbone',
  'models/MovieModel'
], function(_, Backbone, MovieModel) {

  var SearchMovieCollection = Backbone.Collection.extend({

    model: MovieModel,

    initialize: function(options) {
      this.title = options.title;
      this.page = options.page;
    },

    url: function() {
      return 'http://api.themoviedb.org/3/search/movie?api_key=9253b5607c386360d241ec304c9e1520&query='
        + this.title + '&page=' + this.page;
    },

    parse: function(response) {
      return response.results;
    }
  });

  return SearchMovieCollection;
});
