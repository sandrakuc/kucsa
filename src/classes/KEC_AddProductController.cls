/**
 * Created by BRITENET on 21.01.2020.
 */

public with sharing class KEC_AddProductController {

    @AuraEnabled
    public static KEC_AddProductResult addProduct(String productName, Double standardPrice, List<String> availableSizes, List<String> availableColors, String description, List<String> fileIds){
        KEC_AddProductResult addProductResult = KEC_ProductBuilder.createProduct(productName, standardPrice, availableSizes, availableColors, description, fileIds);
        return addProductResult;
    }

    @AuraEnabled
    public static KEC_OperationResult setMainPhoto(String url, String productId){
        List<Product2> products = [SELECT Id, ImgPath__c FROM Product2 WHERE Id =: productId];
        KEC_OperationResult operationResult = KEC_ProductBuilder.setMainProductPhoto(url, products[0]);
        return operationResult;
    }

    @AuraEnabled
    public static List<KEC_Product_Photo__c> productPhotos(String id) {
        List<KEC_Product_Photo__c> photos = [SELECT Id, Product__c, ImgUrl__c FROM KEC_Product_Photo__c WHERE Product__c = :id];
        return photos;
    }

    @AuraEnabled
    public static String getMainPhotoUrl(String id){
        List<Product2> products = [SELECT ImgPath__c FROM Product2 WHERE Id = :id];
        String url = products[0].ImgPath__c;
        return url;
    }

}