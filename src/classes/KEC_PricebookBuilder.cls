/**
 * Created by BRITENET on 28.01.2020.
 */

public with sharing class KEC_PricebookBuilder {

    private static KEC_OperationResult setAndSaveNewPriceBookEntries(String pricebookId, List<KEC_ProductPricesWrapper> productPricesWrappers){
        List<PricebookEntry> newPricebookEntries = new List<PricebookEntry>();
        for(KEC_ProductPricesWrapper wrapper : productPricesWrappers){
            PricebookEntry pricebookEntry = new PricebookEntry(Pricebook2Id = pricebookId, Product2Id = wrapper.productId, UnitPrice = wrapper.discountPrice);
            newPricebookEntries.add(pricebookEntry);
        }
        List<Database.SaveResult> results = Database.insert(newPricebookEntries);
        String message = KEC_Utils.getErrorMessage(results);
        return new KEC_OperationResult(message.equals(System.Label.KEC_OperationSuccess), message);
    }

    private static KEC_OperationResult clearOldPriceBookEntries(String pricebookId){
        List<PricebookEntry> oldPricebookEntries = [SELECT Id FROM PricebookEntry WHERE Pricebook2.Id = :pricebookId];
        List<Database.DeleteResult> results = Database.delete(oldPricebookEntries);
        String message = KEC_Utils.getErrorMessage(results);
        return new KEC_OperationResult(message.equals(System.Label.KEC_OperationSuccess), message);
    }

    public static KEC_OperationResult buildPricebook(String pricebookId, String pricebookName, String discountType, Double discountValue, Date startDate, Date endDate, List<KEC_ProductPricesWrapper> productPricesWrappers){
        KEC_OperationResult operationResult;
        if(!String.isBlank(pricebookId)){
            operationResult = clearOldPriceBookEntries(pricebookId);
            if(!operationResult.isSuccess){
                return operationResult;
            }
        }
        Pricebook2 pricebook = new Pricebook2(Id = pricebookId, Name = pricebookName, DiscountType__c = discountType, Value__c = discountValue, StartDate__c = startDate, EndDate__c = endDate);
        Database.UpsertResult result = Database.upsert(pricebook);
        if(!result.isSuccess()){
            operationResult = new KEC_OperationResult(false, result.getErrors()[0].getMessage());
            return operationResult;
        }
        pricebookId = pricebook.Id;
        return setAndSaveNewPriceBookEntries(pricebookId, productPricesWrappers);
    }

    public static KEC_OperationResult deletePriceBook(String pricebookId){
        KEC_OperationResult operationResult = clearOldPriceBookEntries(pricebookId);
        if(!operationResult.isSuccess){
            return operationResult;
        }
        Database.DeleteResult result = Database.delete(pricebookId);
        operationResult = new KEC_OperationResult(result.isSuccess(), result.isSuccess() ? System.Label.KEC_OperationSuccess : result.getErrors()[0].getMessage());
        return operationResult;
    }
}