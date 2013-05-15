define([
  'jquery', 
  'underscore', 
  'backbone',
  'controllers/MyController',
  'modules/MyModule',
  'transit'

], function($, _, Backbone, MyController, MyModule, transit){
  /**
   * Main Application File Module
   * Store Components inside this object for global refs handles
   * @type {[type]}
   */
  var App = {};

  _.extend ( App, {
    /**
     * Application Entry point. It is called the first time DOM finishes loading
     * @return {[function]} 
     */
      initialize: function(){

        console.log('App::initialize', this);

        this.Controller.start();

        return this;

      },

      Controller: MyController,

      CustomModule: MyModule

    });

  return App;
});