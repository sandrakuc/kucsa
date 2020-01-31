/**
 * Created by BRITENET on 08.01.2020.
 */

public with sharing class KEC_ProductViewController {

    @AuraEnabled
    public static PricebookEntry getProductInfo(String id){
        List<PricebookEntry> entries = [SELECT Id, PriceBook2.Name, Product2.Id, Product2.Description, Product2.ImgPath__c, Product2.AvailableColors__c, Product2.AvailableSizes__c, Product2.BestPrice__c, Product2.Name, UnitPrice, Name FROM PricebookEntry WHERE Id = :id];
        return entries[0];
    }

    @AuraEnabled
    public static List<KEC_Product_Photo__c> productPhotos(String id) {
        List<KEC_Product_Photo__c> photos = [SELECT Id, Product__c, ImgUrl__c FROM KEC_Product_Photo__c WHERE Product__c = :id];
        return photos;
    }

    @AuraEnabled
    public static List<KEC_Favourite_Product__c> checkFavouriteProduct(String id) {
        List<KEC_Favourite_Product__c> favourites = [SELECT Id, Product__c, Size__c, Color__c FROM KEC_Favourite_Product__c WHERE Product__c = :id AND User__c = :UserInfo.getUserId()];
        return favourites;
    }

    @AuraEnabled
    public static KEC_OperationResult addToFavouritesList(String id, Double price, String size, String color, String entry){
        KEC_Favourite_Product__c favouriteProduct = new KEC_Favourite_Product__c(Product__c = id, Price__c = price, Size__c = size, Color__c = color, User__c = UserInfo.getUserId(), Entry__c = entry);
        Database.SaveResult saveResult = Database.insert(favouriteProduct);
        String message = saveResult.isSuccess() ? System.Label.KEC_AddToFavouriteSuccess : saveResult.getErrors()[0].getMessage();
        KEC_OperationResult operationResult = new KEC_OperationResult(saveResult.isSuccess(), message);
        return operationResult;
    }

    @AuraEnabled
    public static KEC_OperationResult createProductOpinion(String id, String color, String size, String content, Integer rating, String sizeRating){
        KEC_Product_Opinion__c productOpinion = new KEC_Product_Opinion__c(User__c = UserInfo.getUserId(), Product__c = id, Color__c = color, Size__c = size, Content__c = content, Rating__c = rating, Size_Rating__c = sizeRating, Date__c = Date.today());
        Database.SaveResult saveResult = Database.insert(productOpinion);
        String message = saveResult.isSuccess() ? System.Label.KEC_OperationSuccess : saveResult.getErrors()[0].getMessage();
        KEC_OperationResult operationResult = new KEC_OperationResult(saveResult.isSuccess(), message);
        return operationResult;
    }

    @AuraEnabled
    public static List<KEC_Product_Opinion__c> productOpinions(String id){
        List<KEC_Product_Opinion__c> productOpinions = [SELECT Id, User__r.Name, Rating__c, Size_Rating__c, Date__c, Size__c, Color__c, Content__c FROM KEC_Product_Opinion__c WHERE Product__c = :id];
        return productOpinions;
    }

    @AuraEnabled
    public static KEC_OperationResult addProductToCart(PricebookEntry product, String color, String size){
        KEC_CartService.addToCart(product, color, size);
        KEC_OperationResult operationResult = new KEC_OperationResult(true, System.Label.KEC_OperationSuccess);
        return operationResult;
    }

}