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

      $(this.el).html(this.template({
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
