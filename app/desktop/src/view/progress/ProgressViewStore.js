Ext.define('ClassicApp.view.Pergress.progressviewStore', {
  extend: 'Ext.data.Store',
  alias: 'store.progressviewstore',
  pageSize: 50,
  autoLoad: true,
  autoSync: true,
  remoteSort: true,
  remoteFilter: true,
  enablePaging: true,
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
  proxy: {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVU0VSX0lEIjoxMDA1LCJST0xFIjoiU3lzIEFkbWluIiwiRU1BSUwiOiJhZHVsLm1Ac3RwaS5jby50aCIsIkZJUlNUX05BTUUiOiJBZHVsIiwiTEFTVF9OQU1FIjoiTW9vbGtodW50b2QiLCJpYXQiOjE1Nzg1NDE5NDEsImV4cCI6MTU4MTEzMzk0MX0.1OiX_iFUz6HKeYMpFQtKZl4kloeBKsai6reqgYYCeQE'
    },
    params: {
      "startRow": 0, "endRow": 200, "rowGroupCols": [], "valueCols": [], "pivotCols": [], "pivotMode": false, "groupKeys": [], "filterModel": {}, "sortModel": []
    },
    type: 'rest',
    api: {
      read: 'https://api.fillup.co.th/v0/sys/grid/TMP_POS_STATION_PROGRESS/',
      update: 'https://api.fillup.co.th/v0/sys/grid/TMP_POS_STATION_PROGRESS/',
      create: 'https://api.fillup.co.th/v0/sys/grid/TMP_POS_STATION_PROGRESS/',
      destroy: 'https://api.fillup.co.th/v0/sys/grid/TMP_POS_STATION_PROGRESS/'
    },
    actionMethods: {
      read: 'POST',
      update: 'PUT',
      create: 'POST',
      destroy: 'DELETE',
    },
    reader: {
      type: 'json',
      rootProperty: 'rows',
      totalProperty: 'total'
    },
    writer: {
      type: 'json',
      encode: true,
      root: 'data'
    }
  },
  sorters: [{
    property: 'UPDATED_AT',
    direction: 'desc'
  }]
});
