Ext.define('Maniac.model.Project',{
	extend:'Ext.data.Model',
	idProperty:'id',
	fields:[
		{name:'id',type:'auto'},
		{name:'name',type:'auto',type:'string'},
		{name:'description',type:'description',type:'string'},
		{name:'priority',type:'priority',type:'int'},
		{name:'dateCreated',type:'date'},
		{name:'lastUpdated',type:'date'},
		{name:'repo'},
		{name:'web'},
		{name:'image'},
		{name:'events'},
		{name:'owner',type:'auto',defaultValue:null}
	],
	proxy:{
		type:'rest', 
		url:'/api/project',
		reader:{type:'json', root:false},
		writer:{type:'json', root:false, writeAllFields:false}
    }
});