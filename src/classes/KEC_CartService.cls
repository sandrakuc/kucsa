/**
 * Created by BRITENET on 14.01.2020.
 */

public with sharing class KEC_CartService {

    public static Map<KEC_PriceBookEntryWrapper, Integer> getCartItems(){
        Map<KEC_PriceBookEntryWrapper, Integer> cartItems = Cache.Org.contains('cartItems') ? (Map<KEC_PriceBookEntryWrapper, Integer>) Cache.Org.get('cartItems') : new Map<KEC_PriceBookEntryWrapper, Integer>();
        return cartItems;
    }

    public static void addToCart(PricebookEntry product, String color, String size){
        KEC_PriceBookEntryWrapper priceBookEntryWrapper = new KEC_PriceBookEntryWrapper(product, color,size);
        Map<KEC_PriceBookEntryWrapper, Integer> cartItems = getCartItems();
        if(cartItems.containsKey(priceBookEntryWrapper)){
            Integer quantity = cartItems.get(priceBookEntryWrapper) + 1;
            cartItems.put(priceBookEntryWrapper, quantity);
        } else {
            cartItems.put(priceBookEntryWrapper, 1);
        }
        Cache.Org.put('cartItems', cartItems);
    }

    public static void removeFromCart(KEC_PriceBookEntryWrapper priceBookEntryWrapper){
        Map<KEC_PriceBookEntryWrapper, Integer> cartItems = getCartItems();
        if(cartItems.containsKey(priceBookEntryWrapper)){
            cartItems.remove(priceBookEntryWrapper);
        }
        Cache.Org.put('cartItems', cartItems);
    }

    public static void decrementProductQuantity(KEC_PriceBookEntryWrapper priceBookEntryWrapper){
        Map<KEC_PriceBookEntryWrapper, Integer> cartItems = getCartItems();
        if(cartItems.get(priceBookEntryWrapper) == 1){
            removeFromCart(priceBookEntryWrapper);
        } else {
            Integer quantity = cartItems.get(priceBookEntryWrapper) - 1;
            cartItems.put(priceBookEntryWrapper, quantity);
            Cache.Org.put('cartItems', cartItems);
        }
    }

    public static Map<KEC_PriceBookEntryWrapper, Integer> clearCart(){
        if(Cache.Org.contains('cartItems')) {
            Cache.Org.remove('cartItems');
        }
        return getCartItems();
    }
}