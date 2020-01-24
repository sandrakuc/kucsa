/**
 * Created by BRITENET on 17.01.2020.
 */

public with sharing class KEC_OrderBuilder {

    private static User getCurrentUser(){
        List<User> users = [SELECT Name, LastName, FirstName, Email, MobilePhone, Street, City, PostalCode, Country FROM User WHERE Id = :UserInfo.getUserId()];
        return users[0];
    }

    private static Account getAccountForUser(User user){
        List<Account> accounts = [SELECT Name, Email__c, LoyaltyPoints__c, LoyaltyCycle__c, Phone, BillingStreet, ShippingStreet, BillingCity, ShippingCity, BillingPostalCode, ShippingPostalCode, BillingCountry, ShippingCountry FROM Account WHERE Name = :user.Name];
        if(accounts.isEmpty()){
            Account account = KEC_UserConverter.convertToAccount(user);
            Database.insert(account);
            checkContactForUser(user, account);
            return account;
        }
        List<Contact> contacts = [SELECT Id, Email, LastName, FirstName FROM Contact WHERE AccountId = :accounts[0].Id];
        if(contacts.isEmpty()){
            checkContactForUser(user, accounts[0]);
        }
        return accounts[0];
    }

    private static void checkContactForUser(User user, Account account){
        Contact contact;
        List<Contact> contacts = [SELECT Id, Email, LastName, FirstName FROM Contact WHERE LastName = :user.LastName AND FirstName = :user.FirstName AND Email = :user.Email];
        if(contacts.isEmpty()){
            contact = KEC_UserConverter.convertToContact(user);
        }
        else{
            contact = contacts[0];
        }
        contact.AccountId = account.Id;
        Database.upsert(contact);
    }

    private static Contract getContractForUser(User user, String accountId){
        List<Contract> contracts = [SELECT Name, BillingStreet, ShippingStreet, BillingCity, ShippingCity, BillingPostalCode, ShippingPostalCode, BillingCountry, ShippingCountry FROM Contract WHERE Name = :user.Name];
        if(contracts.isEmpty()){
            Contract contract = KEC_UserConverter.convertToContract(user, accountId);
            Database.insert(contract);
            return contract;
        }
        return contracts[0];
    }

    private static String getErrorMessage(List<Database.SaveResult> results){
        for(Database.SaveResult result : results){
            if(!result.isSuccess()){
                return result.getErrors()[0].getMessage();
            }
        }
        return System.Label.KEC_OperationSuccess;
    }

    private static Integer getLoyaltyPointsValue(List<KEC_PriceBookEntryWrapper> cartItems){
        Integer totalSum = 0;
        for(KEC_PriceBookEntryWrapper cartItem : cartItems){
            totalSum += (Integer) (cartItem.product.UnitPrice * cartItem.quantity);
        }
        return totalSum * 4;
    }

    private static KEC_OperationResult saveOrderItems(List<KEC_PriceBookEntryWrapper> cartItems, String orderId){
        List<OrderItem> orderItems = KEC_ProductsListToOrderProductsConverter.convert(cartItems, orderId);
        List<Database.SaveResult> results = Database.insert(orderItems);
        String message = getErrorMessage(results);
        KEC_OperationResult operationResult = new KEC_OperationResult(message.equals(System.Label.KEC_OperationSuccess), message);
        return operationResult;
    }

    private static void manageLoyaltyProgram(List<KEC_PriceBookEntryWrapper> cartItems, Account account){
        if(account.LoyaltyPoints__c > 5000){
            account.LoyaltyPoints__c = 0;
            account.LoyaltyCycle__c += 1;
        }
        account.LoyaltyPoints__c += getLoyaltyPointsValue(cartItems);
        Database.upsert(account);
    }

    private static void sendEmail(Order order){
        EmailTemplate emailTemplate = [SELECT Id, Subject, HtmlValue FROM EmailTemplate WHERE DeveloperName ='Order_Confirmation'];
        List<string> toAddress = new List<string>();
        toAddress.add(UserInfo.getUserEmail());
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setTemplateId(emailTemplate.Id);
        mail.setToAddresses(toAddress);
        mail.setTargetObjectId(UserInfo.getUserId());
        mail.setWhatId(order.Id);
        mail.setSaveAsActivity(false);
        mail.setUseSignature(false);
        List<Messaging.SingleEmailMessage> messages = new List<Messaging.SingleEmailMessage>();
        messages.add(mail);
        Messaging.sendEmail(messages, false);
    }

    public static KEC_OperationResult buildOrder(List<KEC_PriceBookEntryWrapper> cartItems){
        User user = getCurrentUser();
        Account account = getAccountForUser(user);
        Contract contract = getContractForUser(user, account.Id);
        Order order = new Order(AccountId = account.Id, ContractId = contract.Id, Status = 'Draft', EffectiveDate = Date.today(), Pricebook2Id = cartItems[0].product.Pricebook2.Id);
        Database.SaveResult result = Database.insert(order);
        KEC_OperationResult operationResult = result.isSuccess() ? saveOrderItems(cartItems, order.Id) : new KEC_OperationResult(false, result.getErrors()[0].getMessage());
        if(operationResult.isSuccess){
            sendEmail(order);
            manageLoyaltyProgram(cartItems, account);
        }
        return operationResult;
    }

}