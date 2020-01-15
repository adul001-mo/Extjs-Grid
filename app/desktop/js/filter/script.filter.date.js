

if (Ext.ux.grid.menu != undefined) {
    Ext.define('Ext.ux.grid.filter.DateFilter', {
        extend: 'Ext.ux.grid.filter.DateFilter',
        alias: 'gridfilter.datex',
        uses: ['Ext.ux.grid.filter.DateFilter', 'Ext.menu.Menu'],
        emptyText: 'Empty',
        defineText: 'Not Empty',
        menuItems: ['after', 'before', '-', 'on', 'empty', 'define'],
        afterText: ['From'],
        beforeText: ['To'],

        compareMap: {
            before: 'lt',
            after: 'gt',
            on: 'eq',
            empty: 'eq',
            define: 'gt'
        },

        init: function (config) {
            this.callParent(arguments);

            // Let's remove the date menu associated with empty

            this.fields.empty.menu = null;
            this.fields.define.menu = null;
        },

        onCheckChange: function (item, checked) {
            var me = this;
            if (item == this.fields.empty) {
                me.setActive(me.isActivatable());
                me.fireEvent('update', me);
                return;
            }else if (item == this.fields.define) {
                me.setActive(me.isActivatable());
                me.fireEvent('update', me);
                return;
            }
            this.callParent(arguments);
        },

        validateRecord: function (record) {
            var val = record.get(this.dataIndex);

            // If we want to see empty values and this is not an empty value then 
            // don't include this row
            if (this.fields.empty.checked && val != null)
                return false;
           
            // If the value is null and any of the other filters are on then don't include any record
            // because it doesn't make sense to compare a null against an existing date. If none of the filters
            // are on then include the row
            if (val == null)
                return !this.fields.on.checked && !this.fields.before.checked && !this.fields.after.checked;

            return this.callParent(arguments);
        }


    });
};
//end


