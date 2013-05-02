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
                        tpl:Ext.create('Ext.XTemplate',
                            '<tpl for=".">',
                                '<div class="info-box">',
                                    '<h3> hello world</h3>',
                                    '<ul class="event">',
                                      '<li class="event-item js-navigation-item js-details-container">',
                                        '<img class="gravatar" height="36" src="https://secure.gravatar.com/avatar/8e65b9c7d5bb8ab81644154e609cedc3?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="36">',
                                        '<p class="event-title">',
                                          '<a href="/ssxenon01/feedback/commit/f7bd50e1c249ac9799cae15159855422d257ffee" class="message">FileUpload section fixed.</a>',
                                        '</p>',
                                        '<div class="commit-meta">',
                                          '<div class="authorship">',
                                            '<span class="author-name"><a href="/ssxenon01" rel="author">ssxenon01</a></span>',
                                            'authored <time class="js-relative-date" datetime="2013-04-22T19:40:26-07:00" title="2013-04-22 19:40:26">6 days ago</time>',
                                          '</div>',
                                        '</div>',
                                      '</li>',
                                  '</ul>',
                                '</div>',
                            '</tpl>'),
                        data:{}
                    }
                ]
            }
        ]
    }]
});