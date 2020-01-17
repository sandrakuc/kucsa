/**
 * Created by BRITENET on 17.01.2020.
 */

public with sharing class KEC_ProductsListToOrderProductsConverter {

    public static List<OrderItem> convert(List<KEC_PriceBookEntryWrapper> cartItems, String orderId){
        List<OrderItem> orderItems = new List<OrderItem>();
        for(KEC_PriceBookEntryWrapper item : cartItems){
            OrderItem orderItem = new OrderItem(OrderId = orderId, Product2Id = item.product.Product2.Id, UnitPrice = item.product.UnitPrice, Quantity = item.quantity, Size__c = item.size, Color__c = item.color, PricebookEntryId = item.product.Id);
            orderItems.add(orderItem);
        }
        return orderItems;
    }
}