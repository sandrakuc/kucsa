/**
 * Created by BRITENET on 17.01.2020.
 */

public with sharing class KEC_ProductsListToOrderProductsConverter {
    private static KEC_Loyalty_Coupon__c getOrderCoupon(String code, String accountId){
        List<KEC_Loyalty_Coupon__c> loyaltyCoupons = [SELECT Id, Code__c, Discount__c, IsValid__c FROM KEC_Loyalty_Coupon__c WHERE Account__c = :accountId AND Code__c = :code AND IsValid__c = TRUE];
        return loyaltyCoupons.isEmpty() ? null : loyaltyCoupons[0];
    }

    private static Double countDiscount(KEC_Loyalty_Coupon__c loyaltyCoupon, Double price){
        Double discountPercent = Double.valueOf(loyaltyCoupon.Discount__c);
        return price - price * discountPercent/100;
    }

    private static void setLoyaltyCouponAsIsUsed(KEC_Loyalty_Coupon__c loyaltyCoupon){
        if(loyaltyCoupon != null){
            loyaltyCoupon.IsUsed__c = true;
            Database.update(loyaltyCoupon);
        }
    }

    public static List<OrderItem> convert(List<KEC_PriceBookEntryWrapper> cartItems, String orderId, String code, String accountId){
        KEC_Loyalty_Coupon__c loyaltyCoupon = String.isBlank(code) ? null : getOrderCoupon(code, accountId);
        setLoyaltyCouponAsIsUsed(loyaltyCoupon);
        List<OrderItem> orderItems = new List<OrderItem>();
        for(KEC_PriceBookEntryWrapper item : cartItems){
            OrderItem orderItem = new OrderItem(OrderId = orderId, Product2Id = item.product.Product2.Id, UnitPrice = loyaltyCoupon == null ? item.product.UnitPrice : countDiscount(loyaltyCoupon, (Double) item.product.UnitPrice), Quantity = item.quantity, Size__c = item.size, Color__c = item.color, PricebookEntryId = item.product.Id);
            orderItems.add(orderItem);
        }
        return orderItems;
    }
}