Ext.define('Maniac.view.form.Base',{
	extend:'Ext.window.Window',
	closeAction:'destroy',
	title:'Base Form',
	width:400,
	layout:'fit',
	initComponent:function(){
		var me = this;
		me.items = [
			{
				xtype:'form',
				url:'/api',
		        defaultType: 'textfield',
		        layout: 'form',
		        bodyPadding: 5,
		        fieldDefaults: {
		            msgTarget: 'side',
		            labelWidth: 75
		        },
		        items:me.fields
			}
		];
		this.on('afterrender',function(win){
			if(me.record){
				me.down('form').getForm().loadRecord(me.record);
			}
		});
		this.callParent(arguments);
	},
	buttons:[
		{
			text:'Submit',
			handler:function(v){
				var me = v.up('window'),form = me.down('form').getForm();
				if(form.isValid()){
					if(me.record){
				        var fs = me.record.fields, dirty = false;
				        me.record.beginEdit();
				        fs.each(function (f) {
				            var field = form.findField(f.name);
				            if (field) {
				                var value = field.getValue();
				                if (value != "" || value != null) {
				                    me.record.set(f.name, value);
				                }
				            }
				        }, this);
				        me.record.endEdit();
				        me.fireEvent('response',me,me.record);
					}else{
				        me.fireEvent('response',me,form.getValues());
					}
					me.close();
				}else{
					// TODO
				}
			}
		},
		{
			text:'Close',
			handler:function(v){
				v.up('window').close();
			}
		}
	]
});