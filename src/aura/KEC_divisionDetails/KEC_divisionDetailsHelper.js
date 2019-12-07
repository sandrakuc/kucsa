
({
    closeEdit: function(component){
        component.set("v.editIsOpen", false);
    },
    openEdit: function(component){
        component.set("v.editIsOpen", true);
    },
    closeDelete: function(component){
        component.set("v.deleteIsOpen", false);
    },
    openDelete: function(component){
        component.set("v.deleteIsOpen", true);
    }
})