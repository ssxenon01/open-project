Ext.define('Maniac.view.form.Project',{
	requires:['Maniac.view.form.Base'],
	extend:'Maniac.view.form.Base',
	fields:[
		{ fieldLabel: 'Төслийн нэр', name: 'name' },
		{ fieldLabel: 'Дэлгэрэнгүй', name: 'description' , xtype:'textarea'},
		{ fieldLabel:'repo', name:'repo' ,vtype:'url'},
		{ fieldLabel:'web', name:'web' ,vtype:'url'},
		{ fieldLabel:'image', name:'image' ,vtype:'url'},
		{ fieldLabel:'events', name:'events' ,vtype:'url'},
		{ fieldLabel:'priority', name:'priority' }
	]
});