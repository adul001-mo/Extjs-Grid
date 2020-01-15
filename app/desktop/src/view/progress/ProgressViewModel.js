Ext.define('ClassicApp.view.Progress.progressviewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.progressviewmodel',
	fields: [
		{ name: 'SEQ', type: 'number' },
		{ name: 'PROVINCE', type: 'string' },
		{ name: 'STATION_NO', type: 'number' },
		{ name: 'PARTNER', type: 'string' },
		{ name: 'MOO', type: 'string' },
		{ name: 'MOOBAN', type: 'string' },
		{ name: 'TAMBON', type: 'string' },
		{ name: 'AMPHOE', type: 'string' },
		{ name: 'SYSTEM', type: 'string' },
		{ name: 'ELECTRIC_DATE', type: 'date' },
		{ name: 'INSTALLATION_DATE', type: 'date' },//,dateFormat: 'd-M-y' 
		{ name: 'FUEL_TEST_DATE', type: 'date' },
		{ name: 'TO_VERIFY_DATE', type: 'date' },
		{ name: 'VERIFY_DATE', type: 'date' },
		{ name: 'READY_DATE', type: 'date' },
		{ name: 'SALES_DATE', type: 'date' },
		{ name: 'STATUS', type: 'string' },
		{ name: 'NOTE', type: 'string' },
		{ name: 'QTY', type: 'number' },
	  ],

});
