/**
 * Created by BRITENET on 08.01.2020.
 */

public with sharing class KEC_ProductViewController {

    @AuraEnabled
    public static PricebookEntry getProductInfo(String id){
        List<PricebookEntry> entries = [SELECT PriceBook2.Name, Product2.Id, Product2.Description, Product2.ImgPath__c, Product2.AvailableColors__c, Product2.AvailableSizes__c, Product2.Name, UnitPrice, Name FROM PricebookEntry WHERE Id = :id];
        return entries[0];
    }

    @AuraEnabled
    public static List<KEC_Product_Photo__c> productPhotos(String id) {
        List<KEC_Product_Photo__c> photos = [SELECT Id, Product__c, ImgUrl__c FROM KEC_Product_Photo__c WHERE Product__c = :id];
        return photos;
    }

    @AuraEnabled
    public static KEC_OperationResult addToFavouritesList(String id, Double price, String size, String color){
        FavouriteProduct__c favouriteProduct = new FavouriteProduct__c(Product__c = id, Price__c = price, Size__c = size, Color__c = color, User__c = UserInfo.getUserId());
        Database.SaveResult saveResult = Database.insert(favouriteProduct);
        String message = saveResult.isSuccess() ? System.Label.KEC_AddToFavouriteSuccess : saveResult.getErrors()[0].getMessage();
        KEC_OperationResult operationResult = new KEC_OperationResult(saveResult.isSuccess(), message);
        return operationResult;
    }

}