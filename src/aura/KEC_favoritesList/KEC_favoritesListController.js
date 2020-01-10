/**
 * Created by BRITENET on 10.01.2020.
 */
({
    onInit: function(component, event, helper){
        helper.getFavorites(component, event, helper);
    },
    onDismiss: function(component, event, helper){
        helper.removeFromFavorites(component, event, helper);
    }
})