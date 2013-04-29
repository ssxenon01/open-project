Ext.define('Maniac.view.form.Project',{
	requires:['Maniac.view.form.Base'],
	extend:'Maniac.view.form.Base',
	fields:[
		{ fieldLabel: 'Төслийн нэр', name: 'name' },
		{ fieldLabel: 'Дэлгэрэнгүй', name: 'description' , xtype:'textarea'}
	]
});