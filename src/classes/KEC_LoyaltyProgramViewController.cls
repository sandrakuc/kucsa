/**
 * Created by BRITENET on 24.01.2020.
 */

public with sharing class KEC_LoyaltyProgramViewController {

    @AuraEnabled
    public static KEC_Loyalty_Coupon__c getLoyaltyCoupons(String accountId){
        List<KEC_Loyalty_Coupon__c> loyaltyCoupons = [SELECT Discount__c, EndDate__c, Code__c FROM KEC_Loyalty_Coupon__c WHERE Account__c = :accountId AND IsValid__c = TRUE LIMIT 1];
        return loyaltyCoupons[0];
    }

    @AuraEnabled
    public static Account getAccountLoyaltyProgramDetails(){
        List<Account> accounts = [SELECT Id, Name, LoyaltyPoints__c FROM Account WHERE User__c = :UserInfo.getUserId()];
        return accounts[0];
    }
}