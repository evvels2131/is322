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
      console.log('TopRatedView Initialized');

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

    
  });
});
