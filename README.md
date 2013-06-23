Backbone.Widget
===============

Widget class replacing Backbone.View

> Features:
- Template engine:  Underscore, Google Closure Templates, Handlebars
- Subview Management
- Model Bindings


Sample construtor:
```
var DemoWidget = Widget.extend({
     config: {
         debug:true,
         time: true,
         templateEngine: 'gc'
    },
    template: {
         templateString: '<div> <h1> Demo Title</h1> <div id="sContainer"> </div> </div>',
         templateDataObject: {}
   },
    subviews: [],
    subviewsContainer: '#sContainer',
    delegate: {},
    events: {},
    model: {},
    initialize: function(){}
})

```
[TODO:: write demo app & annotated source]
