define([
  'jquery',
  'underscore',
  'backbone',
  'models/MovieDetailsModel'
], function($, _, Backbone, MoveDetailsModel) {

  window.MovieDetailsView = Backbone.View.extend({

    template: _.template($('#movie-details-template').html()),

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

      var template = _.template($('#show-movie-details-template').html(), {});

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
            trailer_source: trailer_source
          });

          $(self.el).html(self.template({
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


  });
});
