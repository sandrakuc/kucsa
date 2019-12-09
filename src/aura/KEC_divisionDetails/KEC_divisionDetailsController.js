
({
    openEditModal: function(component, event, helper) {
          helper.openEdit(component);
    },
    openDeleteModal: function(component, event, helper) {
         helper.openDelete(component);
    },
    handleEditSuccess: function(component, event, helper) {
        helper.closeEdit(component);
        helper.handleSuccess(component, event, helper);
    }
})