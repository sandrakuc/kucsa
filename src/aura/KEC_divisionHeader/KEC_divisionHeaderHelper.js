
({
    handleSuccess: function(component, event, helper){
        component.set("v.operationSuccess", true);
        var compEvent = component.getEvent("resultListChange");
        compEvent.setParams({"changeFlag" : true });
        compEvent.fire();
    },
    openNew: function(component, event, helper) {
         component.set("v.newIsOpen", true);
    }
})