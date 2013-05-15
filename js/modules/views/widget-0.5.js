define(['underscore', 'backbone'], function(_, Backbone){
    //adding subview rendering
    var Widget = Backbone.View.extend({

        _template: null,
        
        _templateDefaults: {
            templateString: '<div></div>',
            templateDataObject: {},
            templateEngine: _
        },
        
        _subviews: null,
        
        _subviewsContainer: function(){
            return this.$el;
        },  // use $(selector) 
        
        _config:null,
        
        _configDefaults: {
            debug: false,
            time: false
        },
        
        _viewOptions:  ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'],
        
        makeConfig: function(){
             var _config = {};
            _.extend(_config, this.options.config || this.config);
            this._config = _.extend( _config, _.omit(this._configDefaults, _.keys(_config)));
            if(this._config.debug === true) console.log('%c Widget::makeConfig', 'color:#a9a', this._config);
            
        },
        
        attachViewOptions: function(){
              var _newViewOptions = this.options.viewOptions || this.viewOptions;
              if(this._config.debug === true) console.log('%c Widget::attachViewOptions', 'color:#a9a', _newViewOptions);
              if(_newViewOptions) {
                  this._viewOptions = _.union(this._viewOptions, _newViewOptions);
              }
              _.extend(this, _.pick(this.options, this._viewOptions));
        },

        initSubviews: function(){
                var _subviewsContainer = this.options.subviewsContainer || this.subviewsContainer;
                if (_subviewsContainer) this._subviewsContainer = _subviewsContainer;
                var _subviews = this.options.subviews || this.subviews;
                if (_.isArray(_subviews)) this._subviews = _subviews;
                if(this._config.debug === true) console.log('%c Widget::initSubviews', 'color:#a9a', this._subviews);
        },
        
        renderSubviews: function(){
            if(this._subviews) {
                var $subviewContainer = this.$( this._subviewsContainer )
                $subviewContainer = ($subviewContainer.length) ? $subviewContainer : $subviewContainer.prevObject
                if(this._config.debug === true) console.log('%c Widget::renderSubviews::subviewsContainer' ,'color:#a9a', $subviewContainer)
                _.map(this._subviews, function(subview){
                    subview.renderSubviews();
                    $subviewContainer.append( subview.$el );
                    
                }, this);
            }
        },
        
        addSubview: function(subview){
            if(this._config.debug === true) console.log('%c Widget::addSubview' ,'color:#a9a', subview)
            this._subviews.push(subview);
        },
        
        removeSubview: function(idx){
            if(this._config.debug === true) console.log('%c Widget::removeSubview' ,'color:#a9a', this._subviews[idx])
            this._subviews[idx].remove();
            this._subviews.splice(idx, 1);
        },
        
        getSubview: function(idx){
            if(this._config.debug === true) console.log('%c Widget::getSubview' ,'color:#a9a', this._subviews[idx])
            return this._subviews[idx];
        },
        
        initTemplate: function(){
            var _template = {};
            _.extend(_template, this.options.template || this.template);
            this._template = _.extend( _template, _.omit(this._templateDefaults, _.keys(_template)));
            if( _.isEmpty(this._template.templateDataObject) )  {
                if(this.model)  this._template.templateDataObject = this.model.attributes;   
            }
            if(this._config.debug === true) console.log('%c Widget::initTemplate:: this.options.Template', 'color:#a9a', this.options.template);
            if(this._config.debug === true) console.log('%c Widget::initTemplate:: this.template', 'color:#a9a', this.template);
            if(this._config.debug === true) console.log('%c Widget::initTemplate:: _template', 'color:#a9a', _template);
            if(this._config.debug === true) console.log('%c Widget::initTemplate:: this._template', 'color:#a9a', this._template);
            this.setTemplate();
            
        },
        /**
         * template method - Interface args [ tmplStr, tmplObj ]
         * uses the attached template string and a new tmpl Obj, either from the Model or a new attributes
         */
        processTemplate: function(dataObj){
            if(this._config.debug === true) console.log('%c Widget::processTemplate', 'color:#a9a',  dataObj || this._template.templateDataObject );
            return this._template.templateEngine.template(
                this._template.templateString,
                dataObj || this._template.templateDataObject 
            );
        },
        
        setTemplate: function(dataObj){
            if(this._config.debug === true) console.log('%c Widget::setTemplate', 'color:#a9a',  dataObj );
            this.setElement( this.processTemplate(dataObj), true );
        },
        
        initialize: function(){
            this.makeConfig();
            if(this._config.time === true) window.console.time(this.cid);
            this.attachViewOptions();
            this.initTemplate();
            this.initSubviews();
            this.renderSubviews();
            // if(this._config.debug === true) console.log(this);
            if(this._config.time === true) window.console.timeEnd(this.cid);
            if (this.model) {
                this.listenTo(this.model, 'change', function(){
                    this.handleModelUpdate();
                    if(this._config.debug === true) console.log('%c Model changed for','color:red', this)
                },this)
                this.listenTo(this.model, 'remove', function(){
                    if(this._config.debug === true) console.log('%c Removing view', 'color:red', this);
                    this.remove();
                }, this)
            }
            this.delegateEvents();
            if ( this.options && this.options.initialize ) this.options.initialize.call(this);
            
        },
        
        // initModelBindings: function(){
        //     if(this.model) this.model.on('change', function(evt){
        //         console.log('MODEL EVENT RECIEVED:',evt);
        //         this.handleUpdate();
        //     }, this);
        // },
        
        /** this will trigger a rerendering of the template  with new attributes
         * args [ model.updatedAttributes  ]
         */
        handleModelUpdate: function(){
            if(this._config.debug === true) console.log('%c Model Update', 'color:red', this.model.changed );
            var HTML = this.processTemplate(this.model.attributes);
            if(this._config.debug === true) console.log('%c Template Updated', 'color:red', HTML);
            this.replaceContent(HTML);
            this.renderSubviews();
            if(this._config.debug === true) console.log('%c Widget::handleModelUpdate::$el', 'color:red', this.$el);
            this.render();
            
        },
        
        render: function(add){
            if (add === true) this.container.append( this.$el )
            else $( this.container ).html( this.$el )
            if(this._config.debug === true) console.log('%c Widget::render ', 'color:#a9a', this);
            
        },
        
        renderTo: function(container$el, render){
            if(this._config.debug === true) console.log('%c Widget::renderTo::container', 'color:#a9a', container$el);
            this.container =  container$el.length ? container$el : container$el.prevObject ;
            if (render === true) this.render();
        },
        
        replaceContent: function(HTML, delegate){
            if (delegate === true) this.undelegateEvents();
            this.$el.replaceWith(HTML);
            this.setElement(HTML, true);
            if (delegate === true) this.delegateEvents();
            if(this._config.debug === true) console.log('%c Widget::replaceContent::$el', 'color:red', this.$el);
        },
        
        remove: function(){
            if(this._config.debug === true) console.log('%c Widget::remove', 'color:#a9a', this);
            this._subviews = null;
            Backbone.View.prototype.remove.call(this) // ??
            // this.$el.remove();
        }
        // handleAdd: function(){},
        // 
        // handleRemove: function(){}
        
        
    });
    
    return Widget;
    
});