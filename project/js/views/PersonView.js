define([
  'jquery',
  'underscore',
  'backbone',
  'models/PersonModel',
  'text!templates/person/PersonViewTemplate.html'
], function($, _, Backbone, PersonModel, personViewTemplate) {

  window.PersonView = Backbone.View.extend({

    template: _.template(personViewTemplate),

    initialize: function(options) {
      console.log('PersonView Initialized');
      var self = this;

      this.content = 'undefined';
      this.id = options.id;

      this.model = new PersonModel({
        id: this.id
      });

      this.render();
    },

    render: function() {
      var self = this;

      var template = _.template($('#show-person-details-template').html(), {});

      this.model.fetch({
        success: function(response) {
          self.content = template({
            biography: self.model.get('biography'),
            birthday: self.model.get('birthday'),
            name: self.model.get('name'),
            place_of_birth: self.model.get('place_of_birth'),
            profile_image: self.model.get('profile_path'),
            movie_credits: self.model.get('movie_credits')
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
    }
  });
});
