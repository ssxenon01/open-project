Ext.define('Maniac.view.Viewport',{
	extend:'Ext.container.Viewport',
	layout: 'border',
    items: [{
        region: 'north',
        html: 'Mongolian Open Source Portal',
        cls:'header',
        xtype:'box'
    }, {
        title: 'Options',
        region: 'west',
        animCollapse: true,
        width: 200,
        minWidth: 150,
        maxWidth: 400,
        split: true,
        collapsible: true,
        layout:{
            type: 'accordion',
            animate: true
        },
        items: [{
            html: 'The first tab\'s content. Others may be added dynamically',
            title:'Navigation',
            autoScroll: true,
            border: false,
            iconCls: 'nav'
        },{
            title:'Settings',
            html: 'The first tab\'s content. Others may be added dynamically',
            border: false,
            autoScroll: true,
            iconCls: 'settings'
        }]
    }, {
        region: 'south',
        height: 40,
        layout:{
        	type:'hbox',
        	align:'middle'
        },
        items:[
        	{
        		xtype:'image',
        		margin:'0 0 0 20px',
        		width:120,
        		height:30,
        		src: 'https://developers.google.com/appengine/images/appengine-noborder-120x30.gif'
        	},{ 
        		xtype: 'tbfill' 
        	},{
        		xtype:'component',
        		margin:'0 20px',
        		html:'&copy; 2013 Maniac Team'
        	}
        ]
    }, {
        region: 'center',
        xtype: 'tabpanel',
        activeTab: 0,
        items: [
            {
                title:'Төслүүд',
                xtype:'grid',
                store:'Project',
                tbar:{
                    xtype:'pagingtoolbar',
                    displayInfo:true,
                    store:'Project',
                    items:[ {text:'Нэмэх',role:'add'}]
                },
                columns: [
                    { text: 'Нэр',  dataIndex: 'name',width:200 },
                    { text: 'Дэлгэрэнгүй', dataIndex: 'description', flex: 1 }
                ]
            },
            {
                xtype:'container',
                title:'Хэрэглэгчид',
                layout:{
                    type:'vbox',
                    align:'stretch'
                },
                items:[
                    {
                        flex:2,
                        xtype: 'grid',
                        store:'Actor',
                        columns: [
                            { text: 'Profile',  dataIndex: 'id' ,renderer:function(v,md,rec){
                                return Ext.String.format('<img src="{0}" width="50px" height="50px">',rec.get('avatar_url'))
                            }, width:60},
                            { text: 'Username',  dataIndex: 'login' },
                            { text: 'type', dataIndex: 'type', flex: 1 }
                        ],
                        listeners:{
                            afterrender:function(grid){
                                var preview = grid.next('component');
                                grid.on('itemclick',function(g,rec){
                                    preview.update(rec.data);
                                }); 
                            }
                        }
                    },
                    {
                        flex:1,
                        xtype:'component',
                        tpl:Ext.create('Ext.XTemplate','login: {login} <br>id: {id} <br>avatar_url: {avatar_url} <br>gravatar_id: {gravatar_id} <br>url: {url} <br>html_url: {html_url} <br>followers_url: {followers_url} <br>following_url: {following_url} <br>gists_url: {gists_url} <br>starred_url: {starred_url} <br>subscriptions_url: {subscriptions_url} <br>organizations_url: {organizations_url} <br>repos_url: {repos_url} <br>events_url: {events_url} <br>received_events_url: {received_events_url} <br>type: {type} <br>name: {name} <br>company: {company} <br>blog: {blog} <br>location: {location} <br>email: {email} <br>hireable: {hireable} <br>bio: {bio} <br>public_repos: {public_repos} <br>followers: {followers} <br>following: {following} <br>created_at: {created_at} <br>updated_at: {updated_at} <br>public_gists: {public_gists} <br>'),
                        data:{}
                    }
                ]
            }
        ]
    }]
});