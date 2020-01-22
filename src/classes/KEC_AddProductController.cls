/**
 * Created by BRITENET on 21.01.2020.
 */

public with sharing class KEC_AddProductController {

    @AuraEnabled
    public static KEC_OperationResult addProduct(String productName, Double standardPrice, List<String> availableSizes, List<String> availableColors, String description, List<String> fileIds){
        KEC_OperationResult operationResult = KEC_ProductBuilder.createProduct(productName, standardPrice, availableSizes, availableColors, description, fileIds);
        return operationResult;
    }

    @AuraEnabled
    public static KEC_OperationResult setMainPhoto(String url, Product2 product){
        KEC_OperationResult operationResult = KEC_ProductBuilder.setMainProductPhoto(url, product);
        return operationResult;
    }

}