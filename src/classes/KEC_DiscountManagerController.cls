/**
 * Created by BRITENET on 28.01.2020.
 */

public with sharing class KEC_DiscountManagerController {

    @AuraEnabled
    public static List<Pricebook2> getDiscountsPricebooks() {
        List<Pricebook2> pricebooks = [SELECT Name, IsActive, DiscountType__c, Value__c, StartDate__c, EndDate__c FROM Pricebook2 WHERE IsStandard = FALSE AND StartDate__c != null AND EndDate__c != null];
        return pricebooks;
    }

    @AuraEnabled
    public static List<KEC_ProductPricesWrapper> getDiscountPricebookDetails(String pricebookId){
        List<KEC_ProductPricesWrapper> productPricesWrappers = KEC_DiscountPricebookDetailsHelper.getDiscountPricebookDetails(pricebookId);
        return productPricesWrappers;
    }

    @AuraEnabled
    public static KEC_OperationResult savePricebook(String pricebookId, String pricebookName, String discountType, Double discountValue, Date startDate, Date endDate, List<KEC_ProductPricesWrapper> productPricesWrappers){
        KEC_OperationResult operationResult = KEC_PricebookBuilder.buildPricebook(pricebookId, pricebookName, discountType, discountValue, startDate, endDate, productPricesWrappers);
        return operationResult;
    }

    @AuraEnabled
    public static KEC_OperationResult deletePricebook(String pricebookId){
        KEC_OperationResult operationResult = KEC_PricebookBuilder.deletePriceBook(pricebookId);
        return operationResult;
    }

    @AuraEnabled
    public static List<KEC_ProductPricesWrapper> getProductsToDiscount(String productName, String discountType, Double discountValue){
        List<KEC_ProductPricesWrapper> productPricesWrappers = KEC_PricebookBuilder.getSearchProductsResults(productName, discountType, discountValue);
        return productPricesWrappers;
    }
}