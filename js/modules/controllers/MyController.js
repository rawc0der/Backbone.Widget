define([
 'underscore', 
 'backbone',
 'views/MyView',
 'widget',
 'modules/templates/simple'

], function(_, Backbone, MyView, Widget, simple){
	/**
	 * Controller Object responsible for View construction and application event flow
	 * @type {[Object]}
	 */
	var MyController = _.extend( {}, Backbone.Events );
	/**
	 * Define application logic here, by extending the Controller
	 */
	_.extend( MyController, {
		/**
		 * Function called immediately after App Initialize 
		 */
		start: function(){

			console.log('Controller::Start  --> define logic');		



		} // end start

	});

	return MyController;

});