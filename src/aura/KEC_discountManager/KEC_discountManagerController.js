/**
 * Created by BRITENET on 28.01.2020.
 */
({
    onInit: function(component, event, helper){
        helper.getPricebooks(component);
    },
    onIndexChange: function(component, event, helper){
        helper.getPricebookDetails(component);
    }
})