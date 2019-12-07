({
    openNewModal: function(component, event, helper) {
         component.set("v.newIsOpen", true);
    },
    closeNewModal: function(component, event, helper) {
         component.set("v.newIsOpen", false);
    },
    handleNewSuccess: function(component, event, helper){
       component.set("v.newIsOpen", false);
       component.set("v.operationSuccess", true);
       var compEvent = component.getEvent("resultListChange");
       compEvent.setParams({"changeFlag" : true });
       compEvent.fire();
    },
    closeToast: function(component, event, helper){
       component.set("v.operationSuccess", false);
    }
})