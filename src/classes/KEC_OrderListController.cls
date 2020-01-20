/**
 * Created by BRITENET on 17.01.2020.
 */

public with sharing class KEC_OrderListController {

    @AuraEnabled
    public static List<Order> getOrders(){
        List<Order> orders = [SELECT Id, OrderNumber, EffectiveDate, TotalAmount, Status FROM Order WHERE CreatedById = :UserInfo.getUserId()];
        return orders;
    }

    @AuraEnabled
    public static List<OrderItem> getOrderItems(String orderId){
        List<OrderItem> orderItems = [SELECT Product2.Name, Size__c, Color__c, Product2.ImgPath__c, Quantity, TotalPrice FROM OrderItem WHERE OrderId =:orderId];
        return orderItems;
    }
}