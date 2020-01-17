

if (Ext.ux.grid.menu != undefined) {

    Ext.define('Ext.ux.grid.filter.NumericFilter', {
        extend: 'Ext.ux.grid.filter.Filter',
        alias: 'gridfilter.numeric',
        uses: ['Ext.form.field.Number'],
        selectOnFocus: true,
        width: 125,

        /**
         * @private
         * Template method that is to initialize the filter and install required menu items.
         */
        init: function (config) {
            Ext.applyIf(config, {
                enableKeyEvents: true,
                hideLabel: true,
                listeners: {
                    scope: this,
                    keyup: this.onInputKeyUp,
                    el: {
                        click: function (e) {
                            e.stopPropagation();
                        }
                    }
                }
            });
            this.inputItem = Ext.create('Ext.form.field.Text', config);
            this.inputItem.emptyText = 'Search Number...';
            this.menu.add(this.inputItem);
            var me = this,
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
            this.checkboxItem.addEvents('checkchange');
            this.checkboxItem2.addEvents('checkchange');
            this.checkboxItem.on('checkchange', this.onCheckChange, this);
            this.checkboxItem2.on('checkchange', this.onCheckChange, this);
            this.updateTask = Ext.create('Ext.util.DelayedTask', this.fireUpdate, this);
        },
        checkChange: function (item, checked) {
            if (item.checked) {
                this.fireEvent('checkchange', item, checked);
            }
        },
        /**
         * Set the checked state of this item
         * @param {Boolean} checked The new checked value
         * @param {Boolean} suppressEvent (optional) True to prevent the checkchange event from firing (defaults to false)
         */
        setChecked: function (state, suppressEvent) {
            if (this.checked != state && this.fireEvent("beforecheckchange", this, state) !== false) {
                if (this.container) {
                    this.container[state ? "addClass" : "removeClass"]("x-menu-item-checked");
                }
                this.checked = state;
                if (suppressEvent !== true) {
                    this.fireEvent("checkchange", this, state);
                }
            }
        },
        /**
         * @private
         * Template method that is to get and return the value of the filter.
         * @return {String} The value of this filter
         */
        getValue: function () {
            return this.inputItem.getValue();
        },

        /**
         * @private
         * Template method that is to set the value of the filter.
         * @param {Object} value The value to set the filter
         */
        setValue: function (value) {
            this.inputItem.setValue(value);
            this.fireEvent('update', this);
        },

        /**
         * @private
         * Template method that is to return <tt>true</tt> if the filter
         * has enough configuration information to be activated.
         * @return {Boolean}
         */
        isActivatable: function () {
            var checkboxItemID = "#" + this.checkboxItem.id;
            var checkboxItem2ID = "#" + this.checkboxItem2.id;
            if (this.checkboxItem.checked & this.checkboxItem2.checked) {
                if (this.getValue() == 'Empty') {
                    this.checkboxItem.setChecked(false, false);
                    this.inputItem.setValue('Not Empty');
                } else {
                    this.checkboxItem2.setChecked(false, false);
                    this.inputItem.setValue('Empty');
                }
                return true;
            }
            else if (this.checkboxItem.checked) {
                this.inputItem.setValue('Empty');
                return true;
            } else if (this.checkboxItem2.checked) {
                this.inputItem.setValue('Not Empty');
                return true;
            }
            else {
                if (this.getValue() == 'Empty' || this.getValue() == 'Not Empty') {
                    this.inputItem.setValue('');
                }
                return this.inputItem.getValue().length > 0;
            }
        },

        /**
         * @private
         * Template method that is to get and return serialized filter data for
         * transmission to the server.
         * @return {Object/Array} An object or collection of objects containing
         * key value pairs representing the current configuration of the filter.
         */
        getSerialArgs: function () {
            return { type: 'numeric', value: this.getValue() };
        },
        onCheckChange: function () {
            this.updateTask.delay(this.updateBuffer);
        },

        /**
         * Template method that is to validate the provided Ext.data.Record
         * against the filters configuration.
         * @param {Ext.data.Record} record The record to validate
         * @return {Boolean} true if the record is valid within the bounds
         * of the filter, false otherwise.
         */
        validateRecord: function (record) {
            var val = record.get(this.dataIndex);
            if (typeof val != 'string') {
                return (this.getValue().length === 0);
            }
            if (this.checkboxItem.checked) {
                if (val == "") return true;
            }
            else {
                return val.toLowerCase().indexOf(this.getValue().toLowerCase()) > -1;
            }
        },

        /**
         * @private
         * Handler method called when there is a keyup event on this.inputItem
         */
        onInputKeyUp: function (field, e) {
            var k = e.getKey();
            if (k == e.RETURN && field.isValid()) {
                e.stopEvent();
                this.menu.hide();
                return;
            }
            if (this.getValue() != 'Empty' && this.getValue() != 'Not Empty') {
                this.checkboxItem.setChecked(false, false);
                this.checkboxItem2.setChecked(false, false);
            }
            this.updateTask.delay(this.updateBuffer);
        }
    });
};
//end


