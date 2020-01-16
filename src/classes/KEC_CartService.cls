/**
 * Created by BRITENET on 14.01.2020.
 */

public with sharing class KEC_CartService {

    private static KEC_PriceBookEntryWrapper isCartContains(KEC_PriceBookEntryWrapper priceBookEntryWrapper, List<KEC_PriceBookEntryWrapper> cartItems){
        for(KEC_PriceBookEntryWrapper item : cartItems){
            if (item.equals(priceBookEntryWrapper)){
                return item;
            }
        }
        return null;
    }

    public static List<KEC_PriceBookEntryWrapper> getCartItems(){
    List<KEC_PriceBookEntryWrapper> cartItems = Cache.Org.contains('cartItems') ? (List<KEC_PriceBookEntryWrapper>) Cache.Org.get('cartItems') : new List<KEC_PriceBookEntryWrapper>();
        return cartItems;
    }

    public static void addToCart(PricebookEntry product, String color, String size){
        KEC_PriceBookEntryWrapper priceBookEntryWrapper = new KEC_PriceBookEntryWrapper(product, color,size);
        List<KEC_PriceBookEntryWrapper> cartItems = getCartItems();
        KEC_PriceBookEntryWrapper item = isCartContains(priceBookEntryWrapper, cartItems);
        if(item != null){
            item.quantity += 1;
        }
        else{
            priceBookEntryWrapper.quantity = 1;
            cartItems.add(priceBookEntryWrapper);
        }
        Cache.Org.put('cartItems', cartItems);
    }

    public static void removeFromCart(KEC_PriceBookEntryWrapper priceBookEntryWrapper){
        List<KEC_PriceBookEntryWrapper> cartItems = getCartItems();
        priceBookEntryWrapper = isCartContains(priceBookEntryWrapper, cartItems);
        cartItems.remove(cartItems.indexOf(priceBookEntryWrapper));
        Cache.Org.put('cartItems', cartItems);
    }

    public static void decrementProductQuantity(KEC_PriceBookEntryWrapper priceBookEntryWrapper){
        List<KEC_PriceBookEntryWrapper> cartItems = getCartItems();
        priceBookEntryWrapper = isCartContains(priceBookEntryWrapper, cartItems);
        if(priceBookEntryWrapper.quantity == 1){
            cartItems.remove(cartItems.indexOf(priceBookEntryWrapper));
            Cache.Org.put('cartItems', cartItems);
        }
        else {
            priceBookEntryWrapper.quantity -= 1;
            Cache.Org.put('cartItems', cartItems);
        }
    }

    public static List<KEC_PriceBookEntryWrapper> clearCart(){
        if(Cache.Org.contains('cartItems')) {
            Cache.Org.remove('cartItems');
        }
        return getCartItems();
    }
}