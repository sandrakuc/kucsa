
({
    closeEditModal: function(component, event, helper) {
         helper.closeEdit(component);
    },
    handleEditSuccess: function(component, event, helper) {
            helper.closeEdit(component);
            component.set("v.operationSuccess", true);
            var compEvent = component.getEvent("resultListChange");
            compEvent.setParams({"changeFlag" : true });
            compEvent.fire();
    }
})