Ext.data.Store.addMembers({
    get:function (id, callback) {
        var rec = this.getById(id), me = this;
        if (rec) {
            callback(rec);
        } else {
            Ext.Ajax.request({
                url:me.base ? (me.base + id) : (me.getProxy().url + '/' + id),
                success:function (response) {
                    var record = me.model.create(Ext.decode(response.responseText));
                    me.loadRecords([record], {addRecords:true});
                    callback(record);
                }
            });
        }
    },
    preLoad:function () {
        var me = this;
        if (me.getCount() < 1) {
            me.load();
        }
    }
});
// For Reading total count from http headers (Нийт тоог HTTP header ээс уншина)
Ext.data.reader.Json.addMembers({
    getResponseData: function(response) {
        var data, error;
        try {
            data = Ext.decode(response.responseText);
            data.total = response.getResponseHeader('x-total-count');
            return this.readRecords(data);
        } catch (ex) {
            error = new Ext.data.ResultSet({
                total  : 0,
                count  : 0,
                records: [],
                success: false,
                message: ex.message
            });
            this.fireEvent('exception', this, response, error);
            return error;
        }
    }
});
Ext.Loader.setPath('Ext.ux', 'http://cdn.sencha.io/ext-4.2.0-gpl/examples/ux');
Ext.application({
    name: 'Maniac',
    autoCreateViewport: true,
    controllers:['Main'],
    models:['Repo','Actor','Project'],
    stores:['Repo','Actor','Project'],
    views:['form.Base','form.Project'],
    launch: function() {
        /*this.getStore('Actor').get('ssxenon01',function(rec){
            console.log(rec.data);
        });*/
    }
});