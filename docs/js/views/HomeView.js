define([
  'jquery',
  'underscore',
  'backbone',
  'collections/MoviesCollection',
  'views/movies/MoviesView',
  'text!templates/HomeView.html',
  'text!templates/TopRatedTemplate.html',
  'text!templates/UpcomingTemplate.html'
], function($, _, Backbone, MoviesCollection, MoviesView, homeViewTemplate, 
      topRatedTemplate, upcomingTemplate) {

  window.HomeView = Backbone.View.extend({

    template: _.template(homeViewTemplate),

    initialize: function(options) {
      // Check if category is passed, if not, display now_playing
      if (options.category == null) {
        this.category = 'now_playing';
      } else {
        this.category = options.category;
      }

      if (this.category == 'top_rated') {
        this.template = _.template(topRatedTemplate);
      } else if (this.category == 'upcoming') {
        this.template = _.template(upcomingTemplate);
      }

      this.content = 'undefined';
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

    render: function(eventName) {
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
    },
  });
});
