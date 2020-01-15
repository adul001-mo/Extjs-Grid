Ext.define('ClassicApp.view.Progress.progressview', {
	extend: 'Ext.grid.Panel',
	xtype: 'progressview',
	controller: { type: 'progressviewcontroller' },
	viewModel: { type: 'progressviewmodel' },
	store: { type: 'progressviewstore' },
	requires: [
		'MyAppName.view.main.MainViewModel',
		'Ext.layout.container.Border',
		'Ext.layout.container.Card',
		'Ext.grid.filters.Filters',
		'Ext.toolbar.Paging',
		'Ext.grid.plugin.RowEditing'
	],
	plugins: {
		gridfilters: true,
		rowediting: {
			clicksToMoveEditor: 2,
			autoCancel: false
		}
	},
	emptyText: 'No Records',
	columnLines: true,
	title: 'Progress List',
	itemId:'gridItemId',
	viewConfig: {
		enableTextSelection: true,
	},
	tbar: [
		{
			text: 'Add',
			// iconCls: 'x-fa fa-plus-square',
			handler: 'onAddClick'
		},
		{
			text: 'Pop Up',
			tooltip: '',
			handler: 'showWindow'
		},
		{
			text: 'Show Filters',
			tooltip: 'Show filter data for the store',
			handler: function () {
				var data = [],
					i, r;
				var filters = this.up('grid').getPlugin('gridfilters').getStore().getFilters()
				filters.each(function (filter) {
					data.push(filter.serialize());
				});
				data = Ext.JSON.encodeValue(data, '\n').replace(/^[ ]+/gm, function (s) {
					for (r = '', i = s.length; i--;) {
						r += '&#160;';
					}
					return r;
				});
				data = data.replace(/\n/g, '<br>');
				Ext.Msg.alert('Filter Data', data);
			}
		}, {
			text: 'Clear Filters',
			tooltip: 'Clear all filters',
			handler: function () {
				this.up('grid').getPlugin('gridfilters').clearFilters();
			}
		}

	],
	columns: [
		{ xtype: 'rownumberer', align: "center", width: 35 },
		{
			locked: true,
			text: 'Station',
			columns: [
				{
					xtype: 'actioncolumn',
					width: 35,
					// dataIndex: 'PROVINCE',
					align: "center",
					tooltip: 'Edit',
					items: [{
						iconCls: 'x-fa fa-plus-square',
						handler: 'onGridClick',
					}],

				},
				{
					text: 'Province',
					dataIndex: 'PROVINCE',
					width: 100,
					filter: {
						type: 'string'
					},
					editor: {
						allowBlank: false
					}
				},
				{
					text: 'Phase',
					dataIndex: 'PHASE',
					align: "center",
					width: 80,
					filter: 'number',
					editor: {
						xtype: 'numberfield',
						allowBlank: false,
						minValue: 0,
						maxValue: 50
					}
				},
			]
		},
		{
			text: '#',
			dataIndex: 'SEQ',
			align: "center",
			width: 60,
			filter: 'number',
			format: '0,0',
			editor: {
				xtype: 'numberfield',
				allowBlank: false,
				minValue: 1,
				maxValue: 200
			}
		},
		{
			text: 'Location',
			columns: [
				{
					text: 'No',
					dataIndex: 'STATION_NO',
					width: 100,
					align: "center",
					filter: 'string',
					editor: {
						allowBlank: false
					}
				},
				{
					text: 'Partner',
					dataIndex: 'PARTNER',
					width: 120,
					filter: 'string',
					editor: {
						allowBlank: false
					}
				},
				{
					text: 'Moo',
					dataIndex: 'MOO',
					width: 60,
					align: "center",
					filter: 'string',
					editor: {
						allowBlank: false
					}
				},
				{
					text: 'Mooban',
					dataIndex: 'MOOBAN',
					width: 120,
					filter: 'string',
					editor: {
						allowBlank: false
					}
				},
				{
					text: 'Tambon',
					dataIndex: 'TAMBON',
					width: 120,
					filter: 'string',
					editor: {
						allowBlank: false
					}
				},
				{
					text: 'System',
					dataIndex: 'SYSTEM',
					width: 120,
					filter: 'string',
					editor: {
						allowBlank: false
					}
				},
			]
		},
		{
			text: 'Progress Date',
			columns: [
				{
					text: 'Electric',
					dataIndex: 'ELECTRIC_DATE',
					width: 120,
					align: "center",
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
					text: 'Installation',
					dataIndex: 'INSTALLATION_DATE',
					width: 120,
					align: "center",
					formatter: 'date("d-M-y")',
					filter: 'date',
					editor: {
						xtype: 'datefield',
						// allowBlank: false,
						format: 'd-M-y',
						dateFormat: 'd-M-y',
						minValue: '19-12-19',
						minText: 'Cannot have a start date before the company existed!',
						maxValue: Ext.Date.format(new Date(), 'd-M-y')
					}
				},
				{
					text: 'Fuel Test',
					dataIndex: 'FUEL_TEST_DATE',
					width: 120,
					align: "center",
					formatter: 'date("d-M-y")',
					filter: 'date',
					editor: {
						xtype: 'datefield',
						// allowBlank: false,
						format: 'd-M-y',
						dateFormat: 'd-M-y',
						minValue: '19-12-19',
						minText: 'Cannot have a start date before the company existed!',
						maxValue: Ext.Date.format(new Date(), 'd-M-y')
					}
				},
				{
					text: 'To Verify',
					dataIndex: 'TO_VERIFY_DATE',
					width: 120,
					align: "center",
					formatter: 'date("d-M-y")',
					filter: 'date',
					editor: {
						xtype: 'datefield',
						// allowBlank: false,
						format: 'd-M-y',
						dateFormat: 'd-M-y',
						minValue: '19-12-19',
						minText: 'Cannot have a start date before the company existed!',
						maxValue: Ext.Date.format(new Date(), 'd-M-y')
					}
				},
				{
					text: 'Ready',
					dataIndex: 'READY_DATE',
					width: 120,
					align: "center",
					formatter: 'date("d-M-y")',
					filter: 'date',
					editor: {
						xtype: 'datefield',
						// allowBlank: false,
						format: 'd-M-y',
						dateFormat: 'd-M-y',
						minValue: '19-12-19',
						minText: 'Cannot have a start date before the company existed!',
						maxValue: Ext.Date.format(new Date(), 'd-M-y')
					}
				},
				{
					text: 'Fuel Sales',
					dataIndex: 'SALES_DATE',
					width: 120,
					align: "center",
					formatter: 'date("d-M-y")',
					filter: 'date',
					editor: {
						xtype: 'datefield',
						// allowBlank: false,
						format: 'd-M-y',
						dateFormat: 'd-M-y',
						minValue: '19-12-19',
						minText: 'Cannot have a start date before the company existed!',
						maxValue: Ext.Date.format(new Date(), 'd-M-y')
					}
				}
			]
		},
		{
			text: 'Status',
			dataIndex: 'STATUS',
			width: 120,
			// filter: 'string',
			filter: {
				type: 'list',
				// single: true,
				options: ['Pending', 'Ready', 'Reverify', 'Verify'],
				value: ['Ready']
			},
			editor: {
				allowBlank: false
			}
		},
		{
			text: 'Note',
			dataIndex: 'NOTE',
			width: 120,
			filter: 'string',
			editor: {
				allowBlank: true
			}
		},
		{
			text: 'Qty',
			dataIndex: 'QTY',
			width: 100,
			filter: 'number',
			xtype: 'numbercolumn',
			align: "right",
			format: '0,000.00',
			editor: {
				xtype: 'numberfield',
				allowBlank: false
			}
		}
	],
	bbar: {
		cls: 'painting',
		xtype: 'pagingtoolbar',
		displayInfo: true,
		displayMsg: 'Topics {0} - {1} of {2}',
		emptyMsg: 'No topics to display'
	},
	listeners: {
		canceledit: function () {
			// this.store.reload()
		},
		// canceledit : function ( editor, context, eOpts ){
		// 	var grid = Ext.ComponentQuery.query('#gridItemId')[0];
		// 	console.log(grid)
		// 	// var store = this.store.getStore();
		// 	// var record = this.store.getSelectionModel().getSelection();
		// 	this.store.remove(0);
		//  store.remove(grid.getStore().getAt(rowIndex));
		//    },
		edit : function(grid, record, element, rowIndex, e, eOpt) {
			this.getSelectionModel().select(record)
			console.log(record.newValues);
		}
	}

});