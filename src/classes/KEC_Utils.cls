/**
 * Created by BRITENET on 24.01.2020.
 */

public with sharing class KEC_Utils {

    public static User getCurrentUser(){
        List<User> users = [SELECT Id, Name, LastName, FirstName, Email, MobilePhone, Street, City, PostalCode, Country FROM User WHERE Id = :UserInfo.getUserId()];
        return users[0];
    }

    public static List<Contract> getContracts(String userId){
        List<Contract> contracts = [SELECT Name, BillingStreet, ShippingStreet, BillingCity, ShippingCity, BillingPostalCode, ShippingPostalCode, BillingCountry, ShippingCountry FROM Contract WHERE User__c = :userId];
        return contracts;
    }

    public static List<Contact> getContactsByUser(String userId){
        List<Contact> contacts = [SELECT Id, Email, LastName, FirstName FROM Contact WHERE User__c = :userId];
        return contacts;
    }

    public static List<Contact> getContactByAccount(String accountId){
        List<Contact> contacts = [SELECT Id, Email, LastName, FirstName FROM Contact WHERE AccountId = :accountId];
        return contacts;
    }

    public static List<Account> getAccounts(String userId){
        List<Account> accounts = [SELECT Id, Name, Email__c, LoyaltyPoints__c, LoyaltyCycle__c, Phone, BillingStreet, ShippingStreet, BillingCity, ShippingCity, BillingPostalCode, ShippingPostalCode, BillingCountry, ShippingCountry FROM Account WHERE User__c = :userId];
        return accounts;
    }

    public static String getErrorMessage(List<Database.SaveResult> results){
        for(Database.SaveResult result : results){
            if(!result.isSuccess()){
                return result.getErrors()[0].getMessage();
            }
        }
        return System.Label.KEC_OperationSuccess;
    }
}