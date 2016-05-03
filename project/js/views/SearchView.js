define([
  'jquery',
  'underscore',
  'backbone',
  'collections/SearchMovieCollection',
  'views/movies/MoviesView',
  'text!templates/SearchViewTemplate.html'
], function($, _, Backbone, SearchMovieCollection, MoviesView, searchViewTemplate) {

  window.SearchView = Backbone.View.extend({

    template: _.template(searchViewTemplate),

    events: {
      'click #search-movie-btn': 'searchMovie'
    },

    initialize: function(options) {
      if (options.query != 'undefined') {
        this.title = options.query;
      }
      this.content = 'undefined';
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
      var input = this.$el.find('#search-movie-input').val();

      if (input != '' || input != 'undefined') {
        var idx = window.location.href.indexOf('#search');
        var url = window.location.href.substr(0, idx);
        url = url.concat('#search/', input);
        url = url.replace(/\s/g, '%20');
        window.location.href = url;
      } else {
        console.log('something went wrong, input field empty?');
      }
    }
  });
});
