define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var MovieModel = Backbone.Model.extend({

    defaults: {
      name: '',
      img_url: 'img_url'
    }
  });

  return MovieModel;
});
