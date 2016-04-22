define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone) {

  window.SearchView = Backbone.View.extend({

    template: _.template($('#search').html()),

    events: {
      'click #search-movie-btn': 'searchMovie'
    },

    initialize: function() {
      this.content = 'undefined';
      this.title = 'Star Wars';
      this.page = 1;

      this.moviesCollection = new SearchMovieCollection({
        title: this.title,
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
        success: function() {
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
