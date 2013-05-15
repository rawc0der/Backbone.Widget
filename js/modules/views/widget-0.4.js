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
            
        },
        
        attachViewOptions: function(){
              var _newViewOptions = this.options.viewOptions || this.viewOptions;
              if(this._config.debug === true) console.log('%c Attempting to attach viewOption', 'color:red',_newViewOptions);
              
              if(_newViewOptions) {
                  if(this._config.debug === true) console.log('%c attaching')
                  this._viewOptions = _.union(this._viewOptions, _newViewOptions);
                  
              }
              if(this._config.debug === true) console.log('%c Done','color:red', this._viewOptions);
              _.extend(this, _.pick(this.options, this._viewOptions));
        },
        
        initSubviews: function(){
                var _subviewsContainer = this.options.subviewsContainer || this.subviewsContainer;
                if (_subviewsContainer) this._subviewsContainer = _subviewsContainer;
                var _subviews = this.options.subviews || this.subviews;
                if (_.isArray(_subviews)) this._subviews = _subviews;
        },
        /**
         * expects this.$el */
        renderSubviews: function(){
            if(this._subviews) {
                if(this._config.debug === true) console.log('%c SUBVIEWS:', 'color:green', this._subviews);
                _.map(this._subviews, function(subview){
                    subview.renderSubviews();
                    this.$el.find(this._subviewsContainer).append( subview.$el );
                }, this);
            }
        },
        
        addSubview: function(subview){
            this._subviews.push(subview);
        },
        
        removeSubview: function(idx){
            this._subviews.splice(idx, 1);
        },
        
        initTemplate: function(){
            var _template = {};
            _.extend(_template, this.options.template || this.template);
            this._template = _.extend( _template, _.omit(this._templateDefaults, _.keys(_template)));
            if(this._config.debug === true) console.log('%c this.options.Template', 'color:blue', this.options.template);
            if(this._config.debug === true) console.log('%c this.template', 'color:blue', this.template);
            if(this._config.debug === true) console.log('%c _template', 'color:blue', _template);
            if(this._config.debug === true) console.log('%c this._template', 'color:blue', this._template);
            this.setTemplate();
            
        },
        /**
         * template method - Interface args [ tmplStr, tmplObj ]
         * uses the attached template string and a new tmpl Obj, either from the Model or a new attributes
         */
        processTemplate: function(dataObj){
            return this._template.templateEngine.template(
                this._template.templateString,
                dataObj || this._template.templateDataObject
            );
        },
        
        setTemplate: function(dataObj){
            this.setElement( this.processTemplate(dataObj) );
        },
        
        initialize: function(){
            this.makeConfig();
            if(this._config.time === true) window.console.time(this.cid);
            if(this._config.debug === true) console.log("%c Creating Widget -- options:", 'color:#a34', this.options);
            this.attachViewOptions();
            this.initTemplate();
            this.initSubviews();
            this.renderSubviews();
            if(this._config.debug === true) console.log(this);
            if(this._config.time === true) window.console.timeEnd(this.cid);
            if (this._config.debug === true) console.log('%c Rendering complete:', 'color: #094', this.$el);
            
            console.log(this);
            this.initModelBindings();
        },
        
        initModelBindings: function(){
            if(this.model) this.model.on('change', function(evt){
                console.log('MODEL EVENT RECIEVED:',evt);
                this.handleUpdate();
            }, this);
        },
        
        /** this will trigger a rerendering of the template  with new attributes
         * args [ model.updatedAttributes  ]
         */
        handleUpdate: function(){
            console.log('%c Model Update', 'color:green', this.model.changed );
            var HTML = this.processTemplate(this.model.attributes);
            console.log('%c Template Updated', 'color:green', HTML);
            this.setElement(HTML); //prepares this.$el
            console.log('$EL:', this.$el);
            this.renderSubviews();
            console.log('Attached Subviews', this.$el);
            console.log('Time to goto DOM');
            
        },
        
        // handleAdd: function(){},
        // 
        // handleRemove: function(){}
        
        
    });
    
    return Widget;
    
});