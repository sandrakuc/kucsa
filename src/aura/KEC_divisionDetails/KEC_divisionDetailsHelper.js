
({
    closeEdit: function(component){
        component.set("v.editIsOpen", false);
    },
    openEdit: function(component){
        component.set("v.editIsOpen", true);
    },
    openDelete: function(component){
        component.set("v.deleteIsOpen", true);
    }
})