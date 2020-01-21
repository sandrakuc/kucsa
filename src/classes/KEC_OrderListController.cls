/**
 * Created by BRITENET on 17.01.2020.
 */

public with sharing class KEC_OrderListController {

    @AuraEnabled
    public static List<Order> getOrders(){
        List<Order> orders = [SELECT Id, OrderNumber, EffectiveDate, TotalAmount, Status FROM Order WHERE CreatedById = :UserInfo.getUserId() ORDER BY OrderNumber DESC];
        return orders;
    }

    @AuraEnabled
    public static List<OrderItem> getOrderItems(String orderId){
        List<OrderItem> orderItems = [SELECT Product2.Name, Size__c, Color__c, Product2.ImgPath__c, Quantity, TotalPrice FROM OrderItem WHERE OrderId =:orderId];
        return orderItems;
    }

    @AuraEnabled
    public static KEC_OperationResult createCase(String orderId, String subject, String problemDescription) {
        KEC_OperationResult operationResult = KEC_CaseBuilder.createCase(orderId, subject, problemDescription);
        return operationResult;
    }
}