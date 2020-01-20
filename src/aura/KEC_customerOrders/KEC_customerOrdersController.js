/**
 * Created by BRITENET on 17.01.2020.
 */
({
    onInit: function(component, event, helper){
        helper.getOrdersList(component);
    },
    onIndexChange: function(component, event, helper){
        helper.setOrderDetails(component);
    }
})