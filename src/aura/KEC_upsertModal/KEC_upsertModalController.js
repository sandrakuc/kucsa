
({
    closeEditModal: function(component, event, helper) {
         helper.closeEdit(component);
    },
    handleEditSuccess: function(component, event, helper) {
            helper.closeEdit(component);
            helper.handleSuccess(component, event, helper);
    },
    handleEditSubmit: function(component, event, helper) {
        helper.handleSubmit(component, event, helper);
    }
})