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
      var self = this;

      if ($('#search-movie-input').val() != '') {
        this.title = $('#search-movie-input').val();
        this.render();
      } else {
        console.log('Input field empty');
      }

      //console.log('clicked');
      //console.log(window.location.href);
      //var title = $('#search-movie-input').val();
      //$('#search-movie-input').val('');

      //var title = document.getElementById('search-movie-input').value;

      //var title2 = $('#search-movie-input').val();
      //this.title = $('#search-movie-input').val();
      //console.log(this.title);
      //console.log(title);

      /*var test = window.location.href.indexOf('#search');
      var test2 = window.location.href.substr(0, test);
      var test2 = test2.concat('#search_results/', title);
      var test2 = test2.replace(/\s/g, '%20');
      //window.location = test2;
      console.log(test2);*/
      //this.title = '';
      //window.location = test2;

      //var test_this = 'http://localhost:8888/is322/wrk/project/#search/how%20to%20fuck%20bitches';

      //this.title = $('#search-movie-input').val();
      /*var title = $('#search-movie-input').val();
      console.log(document.getElementById('search-movie-input'));
      console.log(title);

      if (title != '') {
        var url = '';
        var new_url = '';
        var indexOfSearch = window.location.href.indexOf('search');

        if (indexOfSearch < window.location.href.length) {
          //url = test_this.substr(0, indexOfSearch + 7);
          url = window.location.href.substr(0, indexOfSearch + 6);
          new_url = url.concat('/', title);
          new_url = new_url.replace(/\s/g, '%20');
          console.log(new_url);
          //window.location = new_url;
          //window.location.href = new_url;
          //window.location.href = 'ha';
          //console.log(new_url);
          //window.location.href = new_url;
        }
        //window.location.href = new_url;
      }*/
    }
  });
});
