/**
 * Created by BRITENET on 21.01.2020.
 */

public with sharing class KEC_ProductBuilder {

    private static String convertStringListToCommaSeparatedString(List<String> strings){
        String str = '';
        for(Integer i = 0; i < strings.size(); i++){
            str += strings[i];
            if(i != strings.size() - 1){
                str += ',';
            }
        }
        return str;
    }

    private static PricebookEntry createPricebookEntry(Pricebook2 pricebook, Product2 product, Double standardPrice){
        PricebookEntry pricebookEntry = new PricebookEntry(Product2Id = product.Id, Pricebook2Id = pricebook.Id, UnitPrice = standardPrice);
        return pricebookEntry;
    }

    private static Database.SaveResult getFailResult(List<Database.SaveResult> results){
        for(Database.SaveResult result : results){
            if(!result.isSuccess()){
                return result;
            }
        }
        return null;
    }

    private static KEC_OperationResult saveProductPhotos(List<String> fileIds, Product2 product){
        List<KEC_Product_Photo__c> productPhotos = new List<KEC_Product_Photo__c>();
        for(String fileId : fileIds){
            String url = System.Label.KEC_AttachmentUrl + fileId;
            productPhotos.add(new KEC_Product_Photo__c(Product__c = product.Id, ImgUrl__c = url));
        }
        List<Database.SaveResult> saveResults = Database.insert(productPhotos, true);
        Database.SaveResult result = getFailResult(saveResults);
        KEC_OperationResult operationResult = result == null ? new KEC_OperationResult(true, System.Label.KEC_OperationSuccess) : new KEC_OperationResult(false, result.getErrors()[0].message);
        return operationResult;
    }

    private static KEC_OperationResult savePriceBookEntries(Product2 product, Double standardPrice){
        List<Pricebook2> pricebooks = [SELECT Id, Name FROM Pricebook2 WHERE Name = :System.Label.KEC_StandardPricebookName];
        PricebookEntry pricebookEntry = createPricebookEntry(pricebooks[0], product, standardPrice);
        Database.SaveResult result = Database.insert(pricebookEntry);
        KEC_OperationResult operationResult = result.isSuccess() ? new KEC_OperationResult(true, System.Label.KEC_OperationSuccess) : new KEC_OperationResult(false, result.getErrors()[0].message);
        return operationResult;
    }

    public static KEC_OperationResult setMainProductPhoto(String url, Product2 product){
        product.ImgPath__c = url;
        Database.SaveResult result = Database.update(product);
        KEC_OperationResult operationResult = result.isSuccess() ? new KEC_OperationResult(true, System.Label.KEC_OperationSuccess) : new KEC_OperationResult(false, result.getErrors()[0].message);
        return operationResult;
    }

    public static KEC_AddProductResult createProduct(String productName, Double standardPrice, List<String> availableSizes, List<String> availableColors, String description, List<String> fileIds){
        String commaSeparatedSizes = convertStringListToCommaSeparatedString(availableSizes);
        String commaSeparatedColors = convertStringListToCommaSeparatedString(availableColors);
        String photoUrl = System.Label.KEC_AttachmentUrl + fileIds[0];
        Product2 product = new Product2(Name = productName, AvailableSizes__c = commaSeparatedSizes, AvailableColors__c = commaSeparatedColors, Description = description, ImgPath__c = photoUrl);
        Database.SaveResult result = Database.insert(product);
        KEC_OperationResult operationResult;
        if(!result.isSuccess()){
            operationResult = new KEC_OperationResult(false, result.getErrors()[0].message);
            KEC_AddProductResult addProductResult = new KEC_AddProductResult(operationResult, null);
            return addProductResult;
        }
        operationResult = savePriceBookEntries(product, standardPrice);
        if(!operationResult.isSuccess){
            KEC_AddProductResult addProductResult = new KEC_AddProductResult(operationResult, null);
            return addProductResult;
        }
        operationResult = saveProductPhotos(fileIds, product);
        KEC_AddProductResult addProductResult = new KEC_AddProductResult(operationResult, operationResult.isSuccess ? product.Id : null);
        return addProductResult;
    }

}