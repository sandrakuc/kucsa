/**
 * Created by BRITENET on 20.01.2020.
 */
({
    onInit: function(component, event, helper){
        helper.getCases(component);
    },
    onIndexChange: function(component, event, helper){
        helper.setCase(component);
    }
})