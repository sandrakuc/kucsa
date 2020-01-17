/**
 * Created by BRITENET on 17.01.2020.
 */

public with sharing class KEC_UserConverter {

    public static Account convertToAccount(User user){
        Account account = new Account(Name = user.Name, BillingStreet = user.Street, ShippingStreet = user.Street, BillingCity = user.City, ShippingCity = user.City, BillingPostalCode = user.PostalCode, ShippingPostalCode = user.PostalCode, BillingCountry = user.Country, ShippingCountry = user.Country, Phone = user.MobilePhone, Email__c = user.Email);
        return account;
    }

    public static Contract convertToContract(User user, String accountId){
        Contract contract = new Contract(AccountId = accountId, Name = user.Name, BillingStreet = user.Street, ShippingStreet = user.Street, BillingCity = user.City, ShippingCity = user.City, BillingPostalCode = user.PostalCode, ShippingPostalCode = user.PostalCode, BillingCountry = user.Country, ShippingCountry = user.Country);
        return contract;
    }
}