define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {
  var MovieView = Backbone.View.extend({

    tagName: 'li',

    attributes: {
      'data-icon': 'false'
    },

    render: function() {
      var template = _.template($('#movie-template').html(), {});

      $(this.el).html(template({
        original_title: this.model.get('original_title'),
        poster_path: this.model.get('poster_path'),
        vote_average: this.model.get('vote_average'),
        release_date: this.model.get('release_date'),
        id: this.model.get('id')
      }));

      return this;
    }
  });

  return MovieView;
});
