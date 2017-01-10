define([
  'jquery',
  'underscore',
  'backbone',
  'views/movies/MovieView'
], function($, _, Backbone, MovieView) {
  var MoviesView = Backbone.View.extend({

    tagName: 'ul',

    attributes: {
      'data-role': 'listview',
      'data-inset': 'true'
    },

    render: function() {
      this.collection.each(function(movie) {
        var movieView = new MovieView({
          model: movie
        });

        $(this.el).prepend(movieView.render().el);
      }, this);

      return this;
    }
  });

  return MoviesView;
});
