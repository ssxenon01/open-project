Ext.define('Maniac.controller.Main',{
	extend:'Ext.app.Controller',
	stores:['Project'],
	init: function() {
         this.control({
            'viewport grid':{itemdblclick:this.projectGridDblcick},
         	'viewport grid toolbar button[role="add"]':{click:this.addProject}
         });
     },
     projectGridDblcick:function(grid,rec){
        var me = this;
        Ext.create('Maniac.view.form.Project',{
            record:rec,
            listeners:{
                response:function(win,rec){
                    me.getProjectStore().sync();
                }
            }
        }).show();
     },
     addProject:function(){
     	var me = this;
     	Ext.create('Maniac.view.form.Project',{
            record:Ext.create('Maniac.model.Project'),
            listeners:{
                response:function(win,rec){
                    me.getProjectStore().add(rec);
                    me.getProjectStore().sync();
                }
            }
        }).show();
     }
})