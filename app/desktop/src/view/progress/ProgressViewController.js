Ext.define('ClassicApp.view.Progress.progressviewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.progressviewcontroller',
    requires: [
        'ClassicApp.view.Progress.Progressfrom',
    ],

    showWindow: function () {
        var win = this.lookupReference('popupWindow');

        if (!win) {
            win = new ClassicApp.view.Progress.ProgressWindow();
            this.getView().add(win);
        }

        win.show();
    },
    onAddClick: function () {
        var rec = ClassicApp.view.Progress.progressviewModel({});    
        this.isNewRecord = true;    
        var store = this.getView().getStore();    
        store.insert(0, rec);    
        this.getView().getPlugin('rowediting').startEdit(0,0);

        // var view = this.getView(),
        //     rec = new ClassicApp.view.Progress.progressviewModel({});
        // // console.log(rec)
        // // console.log(rec.config)

        // view.store.insert(0, column);
        // view.findPlugin('rowediting').startEdit(0, 0);
        // console.log(rec.config)        
    },

    // routes: {
    //     ':xtype': 'Progressfrom',
    //     action: 'onGridClick',
    // },
    // routes: {
    //     'progressview/:id': 'onGridClick',
    // },
    // routes: {
    //     'ProgressFrom': {
    //         action: 'onGridClick',
    //         // conditions: {
    //         //     ':id': '(?:\/(\\w+))?'
    //         // }
    //     }
    // },

    onGridClick: function (grid, rowIndex, node) {
        // history.back();
        var rec = grid.getStore().getAt(rowIndex);
        // this.redirectTo(`Progressfrom`, {
        //     replace: true
        // })
        this.redirectTo('Progressfrom', true);
        // this.redirectTo(`progressview/${rec.data.PROGRESS_ID}`, true)
    },
    // onShowFilters: function () {
    // var data = [];
    // this.store.getFilters().each(function (filter) {
    // 	data.push(filter.serialize());
    // });
    // data = Ext.JSON.encodeValue(data, '\n').replace(/^[ ]+/gm, function (s) {
    // 	for (var r = '', i = s.length; i--;) {
    // 		r += '&#160;';
    // 	}
    // 	return r;
    // });
    // data = data.replace(/\n/g, '<br>');
    // Ext.Msg.alert('Filter Data', data);

    // },
    // onClearFilters: function () {
    //     this.up('grid').getPlugin('gridfilters').clearFilters();
    // }

});
