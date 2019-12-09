
({
    closeEdit: function(component){
        component.set("v.editIsOpen", false);
    },
    handleSuccess: function(component, event, helper){
        component.set("v.operationSuccess", true);
        var compEvent = component.getEvent("resultListChange");
        compEvent.setParams({"changeFlag" : true });
        compEvent.fire();
    }
})