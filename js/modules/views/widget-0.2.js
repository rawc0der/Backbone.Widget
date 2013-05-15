define(['lib/jquery-1.9.0.min', 'lib/underscore-min','lib/backbone'], function($, _, Backbone){
 
 var Backbone = Backbone || window.Backbone ;
 var _ = _ || window._ ;
 var $ = $ || window.$ ;


 var Widget = Backbone.View.extend({
        /**
         * Subviews container storing references to any child element it contains
         * @type {[Array]}
         */
        _subviews: null,

        constructor: function(options){
            this.cid = _.uniqueId('view');
            var options = options || {};
            if (this.subviews) _.extend( options, { subviews: this.subviews });
            this._configure(options);
            this._ensureElement();
            this._initTemplate();
            this._initSubviews();
            this.initialize.apply(this, arguments);
            this.delegateEvents();
        },
        
        processTemplate: function(templateEngine, templateStr, dataObj){
            var templateStr = templateStr || this._template ;
            var templateEngine = templateEngine || _ ;
            if ( templateEngine && typeof templateEngine.template == 'function' ) {
                this.$el.html( templateEngine.template(templateStr, dataObj) );
            }
        },
        
        setTemplate: function(){
            _.extend(this, { _template: arguments[0]});
        },

        renderTemplate: function(){
            this.$el = this._template;
        },
        
        renderTo: function(selector){
            if (selector) _.extend(this, {_containerEl: $(selector)} );
            if (this._containerEl) this._containerEl.html(this.$el);
        },
        
        render: function(_$){
            var _$ = _$ || this.$el;
            this._renderSubviews(this.$el);
            _$.append(this.$el);
            return this; 
        },

        _initTemplate: function(){
            if( this.options && this.options.templateString ){
                console.log('template:', this.options.templateString );
                this.setTemplate(this.options.templateString);
                if(this.options.dataObject) {
                    this.processTemplate(_, this._template, this.options.dataObject); 
                }
            }
        },

        _initSubviews: function(){
            // if (this.subviews) this._configure(this.subviews);
            if ( this.options && this.options.subviews) {
                this._subviews = [];
                for (var i = 0, subv = this.options.subviews.length; i < subv; i++){
                    if (typeof this.options.subviews[i] == 'function') {
                        console.log('Subview recieved a function reference');
                        this.addSubview(  new this.options.subviews[i]()  );
                    } else {
                        console.log('Subview recieved', typeof this.options.subviews[i] , '<->', this.options.subviews[i]);
                        this.addSubview(  new Widget(this.options.subviews[i])  );
                    }
                }
            }
            
        },

        _renderSubviews: function(_$){
            if ( this._subviews && this._subviews.length ) {
                for ( var i = 0, subvLen = this._subviews.length; i < subvLen; i++ ) {
                    console.log('Rendering subviews', _$);
                    this._subviews[i].render(_$);
                }
                return true;
            }
            return false;
        },

        getSubview: function(index){
            if (this._subviews) return this._subviews[index];
        },

        addSubview: function(index){
            this._subviews.push(arguments[0]);
        },

        removeSubview: function(index){
            if (this._subviews) {
                this._subviews[index].remove();
                this._subviews.splice(index, 1);    
            }
        }
        
});
    
    return Widget;


});  
  