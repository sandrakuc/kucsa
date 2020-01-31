/**
 * Created by BRITENET on 29.01.2020.
 */
({
    onClose: function(component, event, helper){
        helper.close(component);
    },
    onInit: function(component, event, helper){
        helper.prepareTypes(component);
    },
    getType: function(component, event, helper){
        helper.handleType(component, event);
    },
    onDiscountValueChange: function(component, event, helper){
        helper.discountValueChangeHandler(component);
    },
    onSpecialDiscount: function(component, event, helper){
        helper.setSpecialDiscount(component, event);
    },
    onHandleProducts: function(component, event, helper){
        helper.handleProducts(component, event);
    }
})