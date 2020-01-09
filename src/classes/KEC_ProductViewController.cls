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
    public static List<Product_Photo__c> productPhotos(String id) {
        List<Product_Photo__c> photos = [SELECT Id, Product__c, ImgUrl__c FROM Product_Photo__c WHERE Product__c = :id];
        return photos;
    }

}