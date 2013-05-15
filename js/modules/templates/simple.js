// This file was automatically generated from simple.soy.
// Please don't edit this file by hand.

if (typeof templates == 'undefined') { var templates = {}; }
if (typeof templates.simple == 'undefined') { templates.simple = {}; }


templates.simple.helloWorld = function(opt_data, opt_ignored) {
  return 'Hello world!';
};


templates.simple.helloName = function(opt_data, opt_ignored) {
  return '\t' + ((! opt_data.greetingWord) ? '<div>Hello ' + soy.$$escapeHtml(opt_data.name) + '! </div>' : '<div>' + soy.$$escapeHtml(opt_data.greetingWord) + ' ' + soy.$$escapeHtml(opt_data.name) + '! </div>');
};
