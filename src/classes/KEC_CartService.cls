/**
 * Created by BRITENET on 14.01.2020.
 */

public with sharing class KEC_CartService {

    public static List<KEC_PriceBookEntryWrapper> getCartItems(){
    List<KEC_PriceBookEntryWrapper> cartItems = Cache.Org.contains('cartItems') ? (List<KEC_PriceBookEntryWrapper>) Cache.Org.get('cartItems') : new List<KEC_PriceBookEntryWrapper>();
        return cartItems;
    }

    public static void addToCart(PricebookEntry product, String color, String size){
        KEC_PriceBookEntryWrapper priceBookEntryWrapper = new KEC_PriceBookEntryWrapper(product, color,size);
        List<KEC_PriceBookEntryWrapper> cartItems = getCartItems();
        Boolean containsFlag = false;
        for(KEC_PriceBookEntryWrapper item : cartItems){
            if(item.product.Id.equals(priceBookEntryWrapper.product.Id) && item.color.equals(priceBookEntryWrapper.color) && item.size.equals(priceBookEntryWrapper.size)){
                item.quantity += 1;
                containsFlag = true;
            }
        }
        if(!containsFlag){
            priceBookEntryWrapper.quantity = 1;
            cartItems.add(priceBookEntryWrapper);
        }
        Cache.Org.put('cartItems', cartItems);
    }

    public static void removeFromCart(KEC_PriceBookEntryWrapper priceBookEntryWrapper){
        List<KEC_PriceBookEntryWrapper> cartItems = getCartItems();
        for(KEC_PriceBookEntryWrapper item : cartItems) {
            if (item.product.Id.equals(priceBookEntryWrapper.product.Id) && item.color.equals(priceBookEntryWrapper.color) && item.size.equals(priceBookEntryWrapper.size)) {
                priceBookEntryWrapper = item;
            }
        }
        cartItems.remove(cartItems.indexOf(priceBookEntryWrapper));
        Cache.Org.remove('cartItems');
        Cache.Org.put('cartItems', cartItems);
    }

    public static void decrementProductQuantity(KEC_PriceBookEntryWrapper priceBookEntryWrapper){
        List<KEC_PriceBookEntryWrapper> cartItems = getCartItems();
        for(KEC_PriceBookEntryWrapper item : cartItems) {
            if (item.product.Id.equals(priceBookEntryWrapper.product.Id) && item.color.equals(priceBookEntryWrapper.color) && item.size.equals(priceBookEntryWrapper.size)) {
                priceBookEntryWrapper = item;
            }
        }
        if(cartItems.get(cartItems.indexOf(priceBookEntryWrapper)).quantity == 1){
            cartItems.remove(cartItems.indexOf(priceBookEntryWrapper));
            Cache.Org.remove('cartItems');
            Cache.Org.put('cartItems', cartItems);
        } else {
            cartItems.get(cartItems.indexOf(priceBookEntryWrapper)).quantity -= 1;
            Cache.Org.remove('cartItems');
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