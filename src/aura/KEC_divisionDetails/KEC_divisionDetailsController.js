
({
    openEditModal: function(component, event, helper) {
          helper.openEdit(component);
    },
    closeEditModal: function(component, event, helper) {
          helper.closeEdit(component);
    },
    openDeleteModal: function(component, event, helper) {
         helper.openDelete(component);
    },
    closeDeleteModal: function(component, event, helper) {
         helper.closeDelete(component);
    },
    handleEditSuccess: function(component, event, helper) {
        helper.closeEdit(component);
        component.set("v.operationSuccess", true);
        var compEvent = component.getEvent("resultListChange");
        compEvent.setParams({"changeFlag" : true });
        compEvent.fire();
    },
    closeErrorToast: function(component, event, helper){
        component.set("v.operationFailed", false);
    }
})