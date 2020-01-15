Ext.define('ClassicApp.view.Progress.Progressfrom', {
    extend: 'Ext.form.Panel',
    xtype: 'Progressfrom',
    // alias: 'progressview.From',
    require: ['Ext.form.FieldSet'],
    title: 'Progress',

    frame: true,
    width: 100,
    bodyPadding: 10,
    scrollable: true,
    defaultType: 'textfield',
    fieldDefaults: {
        labelAlign: "right",
        labelWidth: 115,
        msgTarget: 'side'
    },

    items: [{
        xtype: 'fieldset',
        title: 'Station',
        defaultType: 'textfield',
        defaults: {
            anchor: '90%'
        },

        items: [
            {
                allowBlank: false,
                fieldLabel: 'Province',
                name: 'PROVINCE',
            },
            {
                xtype: 'numberfield',
                allowBlank: false,
                fieldLabel: 'Phase',
                name: 'PHASE',
                maxValue: 10,
            },
        ]
    },
    {
        xtype: 'fieldset',
        title: 'Location',
        defaultType: 'textfield',
        defaults: {
            anchor: '90%'
        },
        items: [{
            xtype: 'numberfield',
            allowBlank: false,
            fieldLabel: 'SEQ',
            name: 'SEQ',
        },
        {
            allowBlank: false,
            fieldLabel: 'Station No',
            name: 'STATION_NO',
        },
        {
            allowBlank: false,
            fieldLabel: 'Partner',
            name: 'PARTNER',
        },
        {
            allowBlank: false,
            fieldLabel: 'Amphoe',
            name: 'AMPHOE',
        },
        {
            allowBlank: false,
            fieldLabel: 'Tambon',
            name: 'TAMBON',
        },
        {
            allowBlank: false,
            fieldLabel: 'Mooban',
            name: 'MOOBAN',
        },
        {
            allowBlank: false,
            fieldLabel: 'Moo',
            name: 'MOO',
        },
        {
            allowBlank: false,
            fieldLabel: 'System',
            name: 'SYSTEM',
        },
        {
            allowBlank: false,
            fieldLabel: 'Status',
            name: 'STATUS',
        },
        {
            allowBlank: false,
            fieldLabel: 'Node',
            name: 'NOTE',
        }]
    },
    {
        xtype: 'fieldset',
        title: 'Date',
        defaultType: 'datefield',
        defaults: {
            anchor: '90%'
        },
        items: [
            {
                allowBlank: false,
                format: 'd-M-y',
                fieldLabel: 'Electric',
                name: 'ELECTRIC_DATE',
                minValue: Ext.Date.add(new Date(), Ext.Date.DAY, -5),
                maxValue: new Date(),
            },
            {
                allowBlank: false,
                format: 'd-M-y',
                fieldLabel: 'Installation',
                name: 'INSTALLATION_DATE',
                maxValue: new Date(),
            },
            {
                allowBlank: false,
                format: 'd-M-y',
                fieldLabel: 'Fuel Test',
                name: 'FUEL_TEST_DATE',
                maxValue: new Date(),
            },
            {
                allowBlank: false,
                format: 'd-M-y',
                fieldLabel: 'TO Verify',
                name: 'TO_VERIFY_DATE',
                maxValue: new Date(),
            },
            {
                allowBlank: false,
                format: 'd-M-y',
                fieldLabel: 'Verify',
                name: 'VERIFY_DATE',
                maxValue: new Date(),
            },
            {
                allowBlank: false,
                format: 'd-M-y',
                fieldLabel: 'Sale',
                name: 'SALES_DATE',
                maxValue: new Date(),
            },

        ]
    }
    ],

    buttons: [
        {
            text: 'Save',
            align: "Left",
            disabled: true,
            formBind: true
        }
    ],

    defaults: {
        anchor: '40%',
        // labelWidth: 120
    }
});