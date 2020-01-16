/**
 * Created by BRITENET on 14.01.2020.
 */
({
    onInit: function(component, event, helper){
        helper.getCartItems(component);
    },
    removeProduct: function(component, event, helper){
        helper.remove(component, event);
    },
    onClear: function(component, event, helper){
        helper.clear(component);
    },
    onIncrement: function(component, event, helper){
        helper.incrementQuantity(component, event);
    },
    onDecrement: function(component, event, helper){
        helper.decrementQuantity(component, event);
    },
    redirectToView: function(component, event, helper){
        helper.redirectToViewPage(component, event);
    }
})