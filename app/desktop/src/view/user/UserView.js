Ext.define('ClassicApp.view.User.userviewModel', {}

)

Ext.define('ClassicApp.view.User.userviewStore', {
	extend: 'Ext.data.Store',
	alias: 'store.userviewstore',
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


Ext.define('ClassicApp.view.User.userview', {
	extend: 'Ext.grid.Panel',
	xtype: 'userview',
	requires: [
		'Ext.grid.filters.Filters',
		'Ext.toolbar.Paging',
	],
	// viewModel:  Ext.create('ClassicApp.view.User.userviewModel'),
	plugins: {
		gridfilters: true,
		rowediting: {
			clicksToMoveEditor: 2,
			autoCancel: false
		}
	},
	emptyText: 'No Records',
	columnLines: true,
	title: 'User List',
	viewConfig: {
		enableTextSelection: true,
	},
	columns: [
		{ xtype: 'rownumberer' },
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
			editor: {
				allowBlank: false,
				vtype: 'email'
			}
		},
		{
			text: 'Name',
			dataIndex: 'NAME',
			width: 150,
			filter: 'string',			
			editor: {
				allowBlank: false
			}
		},
		{
			text: 'First Name',
			dataIndex: 'FIRST_NAME',
			width: 120,
			filter: 'string',			
			editor: {
				allowBlank: false
			}
		},
		{
			text: 'Last Name',
			dataIndex: 'LAST_NAME',
			width: 120,
			filter: 'string',			
			editor: {
				allowBlank: false
			}
		},
		{
			text: 'Role',
			dataIndex: 'ROLE',
			width: 120,
			filter: 'string',			
			editor: {
				allowBlank: false
			}
		},
		{
			text: 'Created Date',
			dataIndex: 'CREATED_AT',
			width: 140,
			formatter: 'date("d-M-y")',
			filter: 'date',
			editor: {
				xtype: 'datefield',
				allowBlank: false,
				format: 'd-M-y',
				dateFormat: 'd-M-y',
				minValue: '19-12-19',
				minText: 'Cannot have a start date before the company existed!',
				maxValue: Ext.Date.format(new Date(), 'd-M-y')
			}
		},
		{
			text: 'Created Time',
			dataIndex: 'CREATED_AT',
			width: 140,
			formatter: 'date("H:i:s")',
			filter: 'date',
			editor: {
				xtype: 'timefield',
				allowBlank: false,
			}
		}
	],

	dockedItems: [{
		cls:'painting',
		xtype: 'pagingtoolbar',
		dock: 'bottom',
		displayInfo: true,
	}],
	initComponent: function () {
		var me = this;
		var st = Ext.create('ClassicApp.view.User.userviewStore');
		me.store = st;
		me.callParent();
	},
	listeners: {
		canceledit: function () {
			this.store.reload()
		},
		edit : function(grid, record, element, rowIndex, e, eOpt) {
			// this.getSelectionModel().select(record)
			console.log(record.newValues);
		}
	}
});

