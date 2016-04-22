define([
  'jquery',
  'underscore',
  'backbone',
  'collections/SearchMovieCollection',
  'views/movies/MoviesView'
], function($, _, Backbone, SearchMovieCollection, MoviesView) {

  window.SearchView = Backbone.View.extend({

    template: _.template($('#search').html()),

    events: {
      'click #search-movie-btn': 'searchMovie'
    },

    initialize: function() {
      this.content = 'undefined';
      this.title = 'Star Wars';
      this.page = 1;

      this.render();
    },

    render: function() {
      var self = this;

      this.moviesCollection = new SearchMovieCollection({
        title: this.title,
        page: this.page
      });

      this.moviesView = new MoviesView({
        collection: this.moviesCollection
      });

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
    },

    searchMovie: function() {
      this.title = $('#search-movie-input').val();

      if (this.title != '') {
        this.render();
      }
    }
  });
});
