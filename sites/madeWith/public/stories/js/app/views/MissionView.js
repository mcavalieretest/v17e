define( ['App', 'backbone', 'marionette', 'jquery', 'models/Model', 'hbs!templates/mission'],
  function(App, Backbone, Marionette, $, Model, template) {
    //ItemView provides some default rendering logic
    return Backbone.Marionette.ItemView.extend( {
      template: template,
      model: new Model({
        mobile: App.mobile
      }),

      // View Event Handlers
      events: {

      }
    });
  });