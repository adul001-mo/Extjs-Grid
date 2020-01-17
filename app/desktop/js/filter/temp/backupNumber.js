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
    extend: 'Ext.grid.filters.filter.TriFilter',
    alias: ['grid.filter.number', 'grid.filter.numeric'],

    uses: ['Ext.form.field.Number'],

    type: 'number',

    config: {
        /**
         * @cfg {Object} [fields]
         * Configures field items individually. These properties override those defined
         * by `{@link #itemDefaults}`.
         *
         * Example usage:
         *
         *      fields: {
         *          // Override itemDefaults for one field:
         *          gt: {
         *              width: 200
         *          }
         *
         *          // "lt" and "eq" fields retain all itemDefaults
         *      },
         */
        fields: {
            // gt: {
            //     // iconCls: Ext.baseCSSPrefix + 'grid-filters-gt',
            //     // margin: '0 0 3px 0'
            // },
            // lt: {
            //     // iconCls: Ext.baseCSSPrefix + 'grid-filters-lt',
            //     // margin: '0 0 3px 0'
            // },
            // eq: {
            //     // iconCls: Ext.baseCSSPrefix + 'grid-filters-eq',
            //     // margin: 0
            // }
        }
    },

    /**
     * @cfg {String} emptyText
     * The empty text to show for each field.
     * @locale
     */

    menuDefaults: {
        // A menu with only form fields needs some body padding. Normally this padding
        // is managed by the items, but we have no normal menu items.
        bodyPadding: 3,
        margin: 0,
    },

    createMenu: function () {
        var me = this,
            listeners = {
                scope: me,
                keyup: me.onValueChange,
                spin: {
                    fn: me.onInputSpin,
                    buffer: 200
                },
                el: {
                    click: me.stopFn
                }
            },
            itemDefaults = me.getItemDefaults(),
            menuItems = me.menuItems,
            fields = me.getFields(),
            field, i, len, key, item, cfg;

        me.callParent();

        me.fields = {};
        config = Ext.apply({}, me.getItemDefaults());
        this.inputItem = Ext.create('Ext.form.field.Text', {
            scope: this,
            bodyPadding: 3,
            margin: 0
        });
        this.inputItem.emptyText = 'Search Number...';
        this.menu.add(this.inputItem);

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
    },

    getValue: function (field) {
        var value = {};

        value['eq'] = 0;
        return value;
        // return this.inputItem.getValue();
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
            this.inputItem.setValue('');
            // this.filter['eq'] = null
            // console.log(this.filter['eq'])
        }
    },
    isActivatable: function (checked, field) {
        var value = {};
        if (checked === 'Empty') {
            this.inputItem.setValue('Empty');
            this.checkboxItem2.setChecked(false);
            value['eq'] = "" + checked + ""
            this.setValue(value);
 
        } else if (checked === 'Not Empty') {
            this.inputItem.setValue('Not Empty');
            this.checkboxItem.setChecked(false);
            value['eq'] = "" + checked + ""
            this.setValue(value);
        }
    },
    /**
     * @private
     * Handler method called when there is a spin event on a NumberField
     * item of this menu.
     */
    onInputSpin: function (field, direction) {
        var value = {};

        value[field.filterKey] = field.getValue();

        this.setValue(value);
    },

    stopFn: function (e) {
        e.stopPropagation();
    },
    onInputKeyUp: function (field, e) {
        console.log('onInputKeyUp')
        console.log(field, e)
        var k = e.getKey();
        if (k === e.RETURN && field.isValid()) {
            e.stopEvent();
            this.menu.hide();
            return;
        }
        if (this.getValue() !== 'Empty' && this.getValue() !== 'Not Empty') {
            this.checkboxItem.setChecked(false, false);
            this.checkboxItem2.setChecked(false, false);
        }
        this.updateTask.delay(this.updateBuffer);
    }
});
