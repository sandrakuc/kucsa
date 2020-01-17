/**
 * Created by BRITENET on 17.01.2020.
 */

public with sharing class KEC_OrderBuilder {

    private static User getCurrentUser(){
        List<User> users = [SELECT Name, Email, MobilePhone, Street, City, PostalCode, Country FROM User WHERE Id = :UserInfo.getUserId()];
        return users[0];
    }

    private static Account getAccountForUser(User user){
        List<Account> accounts = [SELECT Name, Email__c, Phone, BillingStreet, ShippingStreet, BillingCity, ShippingCity, BillingPostalCode, ShippingPostalCode, BillingCountry, ShippingCountry FROM Account WHERE Name = :user.Name];
        if(accounts.isEmpty()){
            Account account = KEC_UserConverter.convertToAccount(user);
            Database.insert(account);
            return account;
        }
        return accounts[0];
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

    private static KEC_OperationResult saveOrderItems(List<KEC_PriceBookEntryWrapper> cartItems, String orderId){
        List<OrderItem> orderItems = KEC_ProductsListToOrderProductsConverter.convert(cartItems, orderId);
        List<Database.SaveResult> results = Database.insert(orderItems);
        String message = getErrorMessage(results);
        KEC_OperationResult operationResult = new KEC_OperationResult(message.equals(System.Label.KEC_OperationSuccess), message);
        return operationResult;
    }

    public static KEC_OperationResult buildOrder(List<KEC_PriceBookEntryWrapper> cartItems){
        User user = getCurrentUser();
        Account account = getAccountForUser(user);
        Contract contract = getContractForUser(user, account.Id);
        Order order = new Order(AccountId = account.Id, ContractId = contract.Id, Status = 'Draft', EffectiveDate = Date.today(), Pricebook2Id = cartItems[0].product.Pricebook2.Id);
        Database.SaveResult result = Database.insert(order);
        KEC_OperationResult operationResult = result.isSuccess() ? saveOrderItems(cartItems, order.Id) : new KEC_OperationResult(false, result.getErrors()[0].getMessage());
        return operationResult;
    }

}