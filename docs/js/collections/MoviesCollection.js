define([
  'underscore',
  'backbone',
  'models/MovieModel'
], function(_, Backbone, MovieModel) {
  var MoviesCollection = Backbone.Collection.extend({

    model: MovieModel,

    initialize: function(options) {
      this.category = options.category;
      this.page = options.page;
    },

    url: function() {
      return 'https://api.themoviedb.org/3/movie/' + this.category +
        '?api_key=9253b5607c386360d241ec304c9e1520&page=' + this.page;
    },

    parse: function(response) {
      return response.results;
    }
  });

  return MoviesCollection;
});
