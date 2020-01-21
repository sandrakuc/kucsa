/**
 * Created by BRITENET on 20.01.2020.
 */

public with sharing class KEC_CaseController {

    @AuraEnabled
    public static List<Case> getOrderCases(String orderId){
        List<Case> cases = [SELECT CaseNumber, Order__r.OrderNumber, Order__r.TotalAmount, Description, CreatedDate, Subject, Status FROM Case WHERE Order__c =: orderId ORDER BY CaseNumber DESC];
        return cases;
    }

    @AuraEnabled
    public static List<CaseComment> getSpecialistAnswers(String caseId){
        List<CaseComment> caseComments = [SELECT CommentBody, CreatedDate FROM CaseComment WHERE ParentId = :caseId AND IsPublished = TRUE ORDER BY CreatedDate];
        return caseComments;
    }

    @AuraEnabled
    public static List<OrderItem> getOrderItems(String orderId){
        List<OrderItem> orderItems = [SELECT Product2.Name, Size__c, Color__c, Product2.ImgPath__c, Quantity, TotalPrice FROM OrderItem WHERE OrderId =:orderId];
        return orderItems;
    }

}