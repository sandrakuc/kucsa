({
    openNewModal: function(component, event, helper) {
         helper.openNew(component, event, helper);
    },
    handleNewSuccess: function(component, event, helper){
       component.set("v.newIsOpen", false);
       handleSuccess(component, event, helper);
    }
})