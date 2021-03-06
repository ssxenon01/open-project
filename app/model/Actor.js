Ext.define('Maniac.model.Actor',{
	extend:'Ext.data.Model',
	idProperty:'login',
	fields:[
		'login',
		'id',
		'avatar_url',
		'gravatar_id',
		'url',
		'html_url',
		'followers_url',
		'following_url',
		'gists_url',
		'starred_url',
		'subscriptions_url',
		'organizations_url',
		'repos_url',
		'events_url',
		'received_events_url',
		'type',
		'name',
		'company',
		'blog',
		'location',
		'email',
		'hireable',
		'bio',
		'public_repos',
		'followers',
		'following',
		'created_at',
		'updated_at',
		'public_gists'
	],
	proxy:{
		type:'rest', 
		url:'https://api.github.com/users', 
		// url:'https://api.github.com/legacy/user/search/Mongolia', 
		reader:{type:'json', root:false, writeAllFields:false}
    }
});