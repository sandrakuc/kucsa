
({
    openEdit: function(component){
        component.set("v.editIsOpen", true);
    },
    openDelete: function(component){
        component.set("v.deleteIsOpen", true);
    },
    handleSuccess: function(component, event, helper){
        component.set("v.operationSuccess", true);
        var compEvent = component.getEvent("resultListChange");
        compEvent.setParams({"changeFlag" : true });
        compEvent.fire();
    }
})