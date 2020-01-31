/**
 * Created by BRITENET on 10.01.2020.
 */

public with sharing class KEC_FavoritesListController {

    @AuraEnabled
    public static List<KEC_Favourite_Product__c> getFavoritesItemsForUser(){
        List<KEC_Favourite_Product__c> favorites = [SELECT Id, Entry__c, Price__c, Size__c, Color__c, Product__c, Product__r.Name, Product__r.ImgPath__c, Product__r.BestPrice__c FROM KEC_Favourite_Product__c WHERE User__c = :UserInfo.getUserId()];
        return favorites;
    }

    @AuraEnabled
    public static KEC_OperationResult removeFromFavourites(String id){
        Database.DeleteResult result = Database.delete(id);
        String message = result.isSuccess() ? System.Label.KEC_OperationSuccess : result.getErrors()[0].getMessage();
        KEC_OperationResult operationResult = new KEC_OperationResult(result.isSuccess(), message);
        return operationResult;
    }

    @AuraEnabled
    public static KEC_OperationResult addProductToCart(String id, String color, String size){
        List<PricebookEntry> products = [SELECT PriceBook2.Name, Product2.Id, Product2.ImgPath__c, Product2.Name, UnitPrice, Name, Product2.BestPrice__c FROM PricebookEntry WHERE Id = :id];
        KEC_CartService.addToCart(products[0], color, size);
        KEC_OperationResult operationResult = new KEC_OperationResult(true, System.Label.KEC_OperationSuccess);
        return operationResult;
    }
}