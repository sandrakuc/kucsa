/**
 * Created by BRITENET on 20.01.2020.
 */

public with sharing class KEC_CaseController {

    @AuraEnabled
    public static List<Case> getOrderCases(String orderId){
        List<Case> cases = [SELECT CaseNumber, Order__r.OrderNumber, CreatedDate, Subject, Status FROM Case WHERE Order__c =: orderId];
        return cases;
    }

}