/**
 * Created by BRITENET on 28.01.2020.
 */
({
    getPricebookDetails: function(component, event, helper){
        helper.setPricebookId(component, event);
    },
    onNew: function(component, event, helper){
        helper.openNewPriceBookModal(component);
    },
    onEdit: function(component, event, helper){
        helper.openEditPriceBookModal(component, event);
    }
})