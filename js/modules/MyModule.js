define([
  'underscore'

], function(_){
	/**
	 * Custom Module that holds references to utility classes and custom attributes
	 * @type {Object}
	 */
	var MyModule = {};
		/**
		 * Extend the module with any utility functions from external sources
		 */
	_.extend( MyModule, {

		strAttribute: 'Custom String Data',

		arrAttribute: [1, 2, 3, {} ],

		functAttribute: function(){

			console.log('Module::accessing this.strAttribute ', this.strAttribute);

		}

	});

	return MyModule;

});