/**
 * Created by BRITENET on 14.01.2020.
 */
({
    onInit: function(component, event, helper){
        helper.getCartItems(component, event, helper);
    },
    removeProduct: function(component, event, helper){
        helper.remove(component, event, helper);
    },
    onClear: function(component, event, helper){
        helper.clear(component, event, helper);
    },
    onIncrement: function(component, event, helper){
        helper.incrementQuantity(component, event, helper);
    },
    onDecrement: function(component, event, helper){
        helper.decrementQuantity(component, event, helper);
    }
})