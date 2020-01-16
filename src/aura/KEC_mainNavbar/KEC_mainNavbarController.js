/**
 * Created by BRITENET on 16.01.2020.
 */
({
    toHome: function(component, event, helper){
        helper.redirectToSite(component, "/");
    },
    toSearch: function(component, event, helper){
        helper.redirectToSite(component, "/searchproducts");
    },
    toOrders: function(component, event, helper){

    },
    toFavorites: function(component, event, helper){
        helper.redirectToSite(component, "/favoriteslist");
    },
    toBasket: function(component, event, helper){
        helper.redirectToSite(component, "/basket");
    },
    onInit: function(component, event, helper){
        helper.getCartItems(component);
    }
})