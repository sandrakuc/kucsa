/**
 * Created by BRITENET on 17.01.2020.
 */

public with sharing class KEC_UserConverter {

    private static Account convertToAccount(User user){
        Account account = new Account(Name = user.Name, BillingStreet = user.Street, ShippingStreet = user.Street, BillingCity = user.City, ShippingCity = user.City, BillingPostalCode = user.PostalCode, ShippingPostalCode = user.PostalCode, BillingCountry = user.Country, ShippingCountry = user.Country, Phone = user.MobilePhone, Email__c = user.Email, User__c = user.Id);
        return account;
    }

    private static Contract convertToContract(User user, String accountId){
        Contract contract = new Contract(AccountId = accountId, Name = user.Name, BillingStreet = user.Street, ShippingStreet = user.Street, BillingCity = user.City, ShippingCity = user.City, BillingPostalCode = user.PostalCode, ShippingPostalCode = user.PostalCode, BillingCountry = user.Country, ShippingCountry = user.Country, User__c = user.Id);
        return contract;
    }

    private static Contact convertToContact(User user){
        Contact contact = new Contact(Email = user.Email, FirstName = user.FirstName, LastName = user.LastName, User__c = user.Id);
        return contact;
    }

    public static Account getAccountForUser(User user){
        List<Account> accounts = KEC_Utils.getAccounts(user.Id);
        if(accounts.isEmpty()){
            Account account = convertToAccount(user);
            Database.insert(account);
            checkContactForUser(user, account);
            return account;
        }
        List<Contact> contacts = KEC_Utils.getContactByAccount(accounts[0].Id);
        if(contacts.isEmpty()){
            checkContactForUser(user, accounts[0]);
        }
        return accounts[0];
    }

    public static void checkContactForUser(User user, Account account){
        Contact contact;
        List<Contact> contacts = KEC_Utils.getContactsByUser(user.Id);
        if(contacts.isEmpty()){
            contact = KEC_UserConverter.convertToContact(user);
        }
        else{
            contact = contacts[0];
        }
        contact.AccountId = account.Id;
        Database.upsert(contact);
    }

    public static Contract getContractForUser(User user, String accountId){
        List<Contract> contracts = KEC_Utils.getContracts(user.Id);
        if(contracts.isEmpty()){
            Contract contract = KEC_UserConverter.convertToContract(user, accountId);
            Database.insert(contract);
            return contract;
        }
        return contracts[0];
    }
}