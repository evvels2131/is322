define([
  'jquery',
  'underscore',
  'backbone',
  'collections/MoviesCollection',
  'views/movies/MoviesView'
], function($, _, Backbone, MoviesCollection, MoviesView){

  window.TopRatedView = Backbone.View.extend({

    template: _.template($('#movies-top-rated').html()),

    initialize: function() {

      this.content = 'undefined';
      this.category = 'top_rated';
      this.page = 1;

      this.moviesCollection = new MoviesCollection({
        category: this.category,
        page: this.page
      });

      this.moviesView = new MoviesView({
        collection: this.moviesCollection
      });

      this.render();
    },

    render: function() {
      var self = this;
      this.moviesCollection.fetch({
        success: function(response) {
          self.content = self.moviesView.render().el.outerHTML;
          $(self.el).html(self.template({
            content: self.content
          }));
          $(self.el).trigger('create');
        },
        error: function(error) {
          $(self.el).html(self.template({
            content: self.content
          }));
          $(self.el).trigger('create');
          console.log('Error: ' + error);
        }
      });
      return this;
    }
  });
});
