/**
 * Created by BRITENET on 14.01.2020.
 */

public with sharing class KEC_CartController {

    @AuraEnabled
    public static List<KEC_PriceBookEntryWrapper> getCartItemsList(){
        List<KEC_PriceBookEntryWrapper> cartItems = KEC_CartService.getCartItems();
        return cartItems;
    }

    @AuraEnabled
    public static KEC_CartWrapper incrementProductInCart(PricebookEntry product, String color, String size){
        KEC_CartService.addToCart(product, color, size);
        List<KEC_PriceBookEntryWrapper> cartItems = KEC_CartService.getCartItems();
        KEC_OperationResult operationResult = new KEC_OperationResult(true, System.Label.KEC_OperationSuccess);
        KEC_CartWrapper cartWrapper = new KEC_CartWrapper(cartItems, operationResult);
        return cartWrapper;
    }

    @AuraEnabled
    public static KEC_CartWrapper decrementProductInCart(KEC_PriceBookEntryWrapper product){
        KEC_CartService.decrementProductQuantity(product);
        List<KEC_PriceBookEntryWrapper> cartItems = KEC_CartService.getCartItems();
        KEC_OperationResult operationResult = new KEC_OperationResult(true, System.Label.KEC_OperationSuccess);
        KEC_CartWrapper cartWrapper = new KEC_CartWrapper(cartItems, operationResult);
        return cartWrapper;
    }

    @AuraEnabled
    public static KEC_CartWrapper removeFromCart(KEC_PriceBookEntryWrapper product){
        KEC_CartService.removeFromCart(product);
        List<KEC_PriceBookEntryWrapper> cartItems = KEC_CartService.getCartItems();
        KEC_OperationResult operationResult = new KEC_OperationResult(true, System.Label.KEC_OperationSuccess);
        KEC_CartWrapper cartWrapper = new KEC_CartWrapper(cartItems, operationResult);
        return cartWrapper;
    }

    @AuraEnabled
    public static KEC_CartWrapper clearCart(){
        List<KEC_PriceBookEntryWrapper> cartItems = KEC_CartService.clearCart();
        KEC_OperationResult operationResult = new KEC_OperationResult(true, System.Label.KEC_OperationSuccess);
        KEC_CartWrapper cartWrapper = new KEC_CartWrapper(cartItems, operationResult);
        return cartWrapper;
    }
}