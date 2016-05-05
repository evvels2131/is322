define([
  'underscore',
  'backbone'
], function(_, Backbone) {

  var PersonModel = Backbone.Model.extend({

    initialize: function(options) {
      this.id = options.id;
    },

    url: function() {
      return 'https://api.themoviedb.org/3/person/ ' + this.id +
        '?api_key=9253b5607c386360d241ec304c9e1520&append_to_response=movie_credits';
    },

    parse: function(response) {
      return response;
    }
  });

  return PersonModel;
});
