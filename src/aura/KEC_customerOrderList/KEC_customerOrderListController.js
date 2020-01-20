/**
 * Created by BRITENET on 17.01.2020.
 */
({
    getOrder: function(component, event, helper){
        helper.getOrderIndex(component, event);
    },
    goToCases: function(component, event, helper){
        helper.redirectToCaseListPage(component, event);
    }
})