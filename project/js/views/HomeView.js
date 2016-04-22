define([
  'jquery',
  'underscore',
  'backbone',
  'models/MovieModel'
  //'models/MovieModel'
  //'model/MovieModel'
  //'text!templates/HomePageView.html'
], function($, _, Backbone, MovieModel) {

  window.HomeView = Backbone.View.extend({

    template: _.template($('#home').html()),

    initialize: function() {
      var movieModel = new MovieModel();
      console.log(movieModel.toJSON());
      //var movieModel = new MovieModel();
      //console.log(movieModel.toJSON());
      console.log('Heyyy');
    },

    render: function(eventName) {
      $(this.el).html(this.template());
      return this;
    }

  });
});
