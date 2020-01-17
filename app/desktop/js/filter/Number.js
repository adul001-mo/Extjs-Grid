/**
 * Filter type for {@link Ext.grid.column.Number number columns}.
 *
 *     @example
 *     var shows = Ext.create('Ext.data.Store', {
 *           fields: ['id','show'],
 *           data: [
 *               {id: 0, show: 'Battlestar Galactica'},
 *               {id: 1, show: 'Doctor Who'},
 *               {id: 2, show: 'Farscape'},
 *               {id: 3, show: 'Firefly'},
 *               {id: 4, show: 'Star Trek'},
 *               {id: 5, show: 'Star Wars: Christmas Special'}
 *           ]
 *        });
 *       
 *       Ext.create('Ext.grid.Panel', {
 *           renderTo: Ext.getBody(),
 *           title: 'Sci-Fi Television',
 *           height: 250,
 *           width: 250,
 *           store: shows,
 *           plugins: {
 *               gridfilters: true
 *           },
 *           columns: [{
 *               dataIndex: 'id',
 *               text: 'ID',
 *               width: 50,
 *               filter: 'number' // May also be 'numeric'
 *           },{
 *               dataIndex: 'show',
 *               text: 'Show',
 *               flex: 1                  
 *           }]
 *       });
 * 
 */
Ext.define('Ext.grid.filters.filter.Number', {
    extend: 'Ext.grid.filters.filter.SingleFilter',   
    alias: ['grid.filter.number', 'grid.filter.numeric'],    
    uses: ['Ext.form.field.Number'],

    type: 'string',

    operator: 'eq',

    /**
     * @cfg {String} emptyText
     * The empty text to show for each field.
     * @locale
     */
    emptyText: 'Search Filter Number...',

    itemDefaults: {
        xtype: 'textfield',
        enableKeyEvents: true,
        // hideEmptyLabel: false,
        // iconCls: Ext.baseCSSPrefix + 'grid-filters-find',
        labelSeparator: '',
        labelWidth: 29,
        margin: 0,
        selectOnFocus: true
    },

    menuDefaults: {
        // A menu with only form fields needs some body padding. Normally this padding
        // is managed by the items, but we have no normal menu items.
        bodyPadding: 3,
        showSeparator: false
    },

    /**
     * @private
     * Template method that is to initialize the filter and install required menu items.
     */
    createMenu: function () {
        var me = this, config;
        me.callParent();

        config = Ext.apply({}, me.getItemDefaults());

        if (config.iconCls && !('labelClsExtra' in config)) {
            config.labelClsExtra = Ext.baseCSSPrefix + 'grid-filters-icon ' + config.iconCls;
        }

        delete config.iconCls;

        config.emptyText = config.emptyText || me.emptyText;
        me.inputItem = me.menu.add(config);

        listeners = {
            checkchange: me.checkChange,
            scope: me
        };
        this.checkboxItem = Ext.create('Ext.menu.CheckItem', {
            text: 'Empty',
            hideOnClick: false,
            value: 'Empty',
            listeners: listeners,
            scope: this
        })
        this.checkboxItem2 = Ext.create('Ext.menu.CheckItem', {
            text: 'Not Empty',
            hideOnClick: false,
            value: 'Not Empty',
            listeners: listeners,
            scope: this
        })
        this.menu.add(this.checkboxItem);
        this.menu.add(this.checkboxItem2);
        this.updateTask = Ext.create('Ext.util.DelayedTask', this.fireUpdate, this);
        me.inputItem.on({
            scope: me,
            keyup: me.onValueChange,
            el: {
                click: function (e) {
                    e.stopPropagation();
                }
            }
        });
    },
    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter.
     */
    setValue: function (value) {
        var me = this;

        if (me.inputItem) {
            me.inputItem.setValue(value);
        }

        me.filter.setValue(value);

        if (value && me.active) {
            me.value = value;
            me.updateStoreFilter();
        }
        else {
            me.setActive(!!value);
        }
    },
    /**
     * @private
     * Template method that is to return <tt>true</tt> if the filter
     * has enough configuration information to be activated.
     * @return {Boolean}
     */
    checkChange: function (item, checked, field) {
        if (item.checked) {
            this.isActivatable(item.value, field)
        } else {
            this.isActivatable(false, field)
        }
    },

    isActivatable: function (checked, field) {
        var text = '';
        if (checked === 'Empty') {
            this.inputItem.setValue('Empty');
            this.checkboxItem2.setChecked(false);
            text = 'Empty';
        } else if (checked === 'Not Empty') {
            this.inputItem.setValue('Not Empty');
            this.checkboxItem.setChecked(false);
            text = 'Not Empty';
        } else {
            this.inputItem.setValue('');
            text = '';
        }
        this.setValue(text);
    },

    activateMenu: function () {
        this.inputItem.setValue(this.filter.getValue());
    },

    createFilter: function (config, key) {
        var me = this;

        if (me.filterFn) {
            return new Ext.util.Filter({
                filterFn: function (rec) {
                    return Ext.callback(me.filterFn, me.scope, [rec, me.inputItem.getValue()]);
                }
            });
        }
        else {
            return me.callParent([config, key]);
        }
    },
});
