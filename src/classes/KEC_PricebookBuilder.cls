/**
 * Created by BRITENET on 28.01.2020.
 */

public with sharing class KEC_PricebookBuilder {

    private static List<KEC_ProductPricesWrapper> convertToProductPricesWrappers(List<PricebookEntry> pricebookEntries){
        List<KEC_ProductPricesWrapper> productPricesWrappers = new List<KEC_ProductPricesWrapper>();
        for(PricebookEntry pricebookEntry : pricebookEntries){
            KEC_ProductPricesWrapper productPricesWrapper = new KEC_ProductPricesWrapper();
            productPricesWrapper.productId = pricebookEntry.Product2.Id;
            productPricesWrapper.productName = pricebookEntry.Product2.Name;
            productPricesWrapper.standardPrice = pricebookEntry.UnitPrice;
            productPricesWrappers.add(productPricesWrapper);
        }
        return productPricesWrappers;
    }

    private static KEC_OperationResult setAndSaveNewPriceBookEntries(String pricebookId, List<KEC_ProductPricesWrapper> productPricesWrappers){
        List<PricebookEntry> newPricebookEntries = new List<PricebookEntry>();
        for(KEC_ProductPricesWrapper wrapper : productPricesWrappers){
            PricebookEntry pricebookEntry = new PricebookEntry(Pricebook2Id = pricebookId, Product2Id = wrapper.productId, UnitPrice = wrapper.discountPrice);
            newPricebookEntries.add(pricebookEntry);
        }
        List<Database.SaveResult> results = Database.insert(newPricebookEntries);
        KEC_UpdateProductsBestPriceBatch batch = new KEC_UpdateProductsBestPriceBatch();
        Database.executeBatch(batch, 200);
        String message = KEC_Utils.getErrorMessage(results);
        return new KEC_OperationResult(message.equals(System.Label.KEC_OperationSuccess), message);
    }

    private static KEC_OperationResult clearOldPriceBookEntries(String pricebookId){
        List<PricebookEntry> oldPricebookEntries = [SELECT Id, Product2Id FROM PricebookEntry WHERE Pricebook2.Id = :pricebookId];
        List<Database.DeleteResult> results = Database.delete(oldPricebookEntries);
        KEC_UpdateProductsBestPriceBatch batch = new KEC_UpdateProductsBestPriceBatch();
        Database.executeBatch(batch, 200);
        String message = KEC_Utils.getErrorMessage(results);
        return new KEC_OperationResult(message.equals(System.Label.KEC_OperationSuccess), message);
    }

    private static List<KEC_ProductPricesWrapper> setPercentDiscount(List<KEC_ProductPricesWrapper> productPricesWrappers, Double discountValue){
        for(KEC_ProductPricesWrapper productPricesWrapper : productPricesWrappers){
            productPricesWrapper.discountPrice = productPricesWrapper.standardPrice - (productPricesWrapper.standardPrice*discountValue)/100;
        }
        return productPricesWrappers;
    }

    private static List<KEC_ProductPricesWrapper> setAmountDiscount(List<KEC_ProductPricesWrapper> productPricesWrappers, Double discountValue){
        for(KEC_ProductPricesWrapper productPricesWrapper : productPricesWrappers){
            productPricesWrapper.discountPrice = productPricesWrapper.standardPrice - discountValue;
        }
        return productPricesWrappers;
    }

    private static List<KEC_ProductPricesWrapper> setDiscount(List<KEC_ProductPricesWrapper> productPricesWrappers, String discountType, Double discountValue){
        List<String> discountTypes = System.Label.KEC_DiscountTypeOptions.split(',');
        if(String.isBlank(discountType) || discountType.equals(discountTypes[0])){
            return setPercentDiscount(productPricesWrappers, discountValue);
        }
        else{
            return setAmountDiscount(productPricesWrappers, discountValue);
        }
    }

    public static KEC_OperationResult buildPricebook(String pricebookId, String pricebookName, String discountType, Double discountValue, Date startDate, Date endDate, List<KEC_ProductPricesWrapper> productPricesWrappers){
        KEC_OperationResult operationResult;
        if(!String.isBlank(pricebookId)){
            operationResult = clearOldPriceBookEntries(pricebookId);
            if(!operationResult.isSuccess){
                return operationResult;
            }
        }
        List<String> discountTypes = System.Label.KEC_DiscountTypeOptions.split(',');
        Pricebook2 pricebook = new Pricebook2(Id = pricebookId, Name = pricebookName, DiscountType__c = discountType == null ? discountTypes[0] : discountType, Value__c = discountValue, StartDate__c = startDate, EndDate__c = endDate);
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

    public static List<KEC_ProductPricesWrapper> getSearchProductsResults(String productName, String discountType, Double discountValue){
        productName = '%' + productName + '%';
        List<PricebookEntry> pricebookEntries = [SELECT Id, Product2Id, UnitPrice, Product2.Name FROM PricebookEntry WHERE Pricebook2.Name = :System.Label.KEC_StandardPriceBookName AND Product2.Name LIKE :productName];
        List<KEC_ProductPricesWrapper> productPricesWrappers = convertToProductPricesWrappers(pricebookEntries);
        if(discountValue != null){
            productPricesWrappers = setDiscount(productPricesWrappers, discountType, discountValue);
        }
        return productPricesWrappers;
    }
}