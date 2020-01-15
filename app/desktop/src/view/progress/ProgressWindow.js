Ext.define('ClassicApp.store.Objects', {
    extend: 'Ext.data.Store',
    alias: 'store.popupstore',
    pageSize: 50,
    autoLoad: true,
    autoSync: true,
    remoteSort: true,
    remoteFilter: true,
    enablePaging: true,
    fields: [
        { name: 'USER_ID', type: 'number' },
        { name: 'EMAIL', type: 'string' },
        { name: 'NAME', type: 'string' },
        { name: 'FIRST_NAME', type: 'string' },
        { name: 'LAST_NAME', type: 'string' },
        { name: 'COMPANY', type: 'string' },
        { name: 'ROLE', type: 'string' },
        { name: 'CREATED_AT', type: 'date' },
    ],
    proxy: {
        type: 'rest',
        url: 'https://api.fillup.co.th/v0/sys/grid/TMP_SYS_USER/',
        method: 'POST',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVU0VSX0lEIjoxMDA1LCJST0xFIjoiU3lzIEFkbWluIiwiRU1BSUwiOiJhZHVsLm1Ac3RwaS5jby50aCIsIkZJUlNUX05BTUUiOiJBZHVsIiwiTEFTVF9OQU1FIjoiTW9vbGtodW50b2QiLCJpYXQiOjE1Nzg1NDE5NDEsImV4cCI6MTU4MTEzMzk0MX0.1OiX_iFUz6HKeYMpFQtKZl4kloeBKsai6reqgYYCeQE'
        },
        type: 'rest',
        params: {
            "startRow": 0, "endRow": 200, "rowGroupCols": [], "valueCols": [], "pivotCols": [], "pivotMode": false, "groupKeys": [], "filterModel": {}, "sortModel": []
        },
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        }
    },
    sorters: [{
        property: 'UPDATED_AT',
        direction: 'desc'
    }]
});

Ext.define('ClassicApp.view.Progress.ProgressWindow', {
    extend: 'Ext.window.Window',
    xtype: 'form-contact-window',
    requires: [
        'Ext.grid.filters.Filters',
        'Ext.toolbar.Paging',
    ],
    reference: 'popupWindow',
    title: 'User List',
    closeAction: 'hide',

    items: [{
        xtype: 'form',
        reference: 'windowForm',
        items: [{
            extend: 'Ext.grid.Panel',
            xtype: 'grid',
            width: 1000,
            height: 780,
            plugins: {
                gridfilters: true,
            },
            emptyText: 'No Records',
            store: { type: 'popupstore' },
            selModel: {
                type: 'checkboxmodel',
                checkOnly: true
            },
            columns: [
                // { xtype: 'rownumberer' },
                {
                    text: 'User Id',
                    dataIndex: 'USER_ID',
                    hidden: true,
                    width: 100,
                    filter: 'number',
                    cell: { userCls: 'bold' }
                },
                {
                    text: 'Email',
                    dataIndex: 'EMAIL',
                    width: 160,
                    filter: 'string',
                },
                {
                    text: 'Name',
                    dataIndex: 'NAME',
                    width: 150,
                    filter: 'string',
                },
                {
                    text: 'First Name',
                    dataIndex: 'FIRST_NAME',
                    width: 120,
                    filter: 'string',
                },
                {
                    text: 'Last Name',
                    dataIndex: 'LAST_NAME',
                    width: 120,
                    filter: 'string',
                },
                {
                    text: 'Role',
                    dataIndex: 'ROLE',
                    width: 120,
                    filter: 'string',
                },
                {
                    text: 'Created Date',
                    dataIndex: 'CREATED_AT',
                    width: 140,
                    formatter: 'date("d-M-y")',
                    filter: 'date',
                },
                {
                    text: 'Created Time',
                    dataIndex: 'CREATED_AT',
                    width: 140,
                    formatter: 'date("H:i:s")',
                    filter: 'date',
                }
            ],
            dockedItems: [{
                cls:'painting',
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
            }]
        }]

    }]


});
