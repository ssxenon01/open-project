Ext.define('Maniac.store.Repo',{
	extend:'Ext.data.Store',
	model:'Maniac.model.Repo',
	base:'https://api.github.com/repos/'
});