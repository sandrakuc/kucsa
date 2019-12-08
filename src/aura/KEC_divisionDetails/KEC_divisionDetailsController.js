
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
    handleEditSuccess: function(component, event, helper) {
        helper.closeEdit(component);
        component.set("v.operationSuccess", true);
        var compEvent = component.getEvent("resultListChange");
        compEvent.setParams({"changeFlag" : true });
        compEvent.fire();
    }
})