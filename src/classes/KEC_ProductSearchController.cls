/**
 * Created by BRITENET on 06.01.2020.
 */

public without sharing class KEC_ProductSearchController {
    @AuraEnabled
    public static List<PricebookEntry> searchProducts(String name){
        name = '%' + name + '%';
        List<PricebookEntry> entries = [SELECT PriceBook2.Name, Product2.Id, Product2.ImgPath__c, Product2.AvailableColors__c, Product2.AvailableSizes__c, Product2.Name, UnitPrice, Name FROM PricebookEntry WHERE  PriceBook2.Name = 'Kucsa Price Book' AND Product2.Name LIKE :name];
        return entries;
    }

    @AuraEnabled
    public static List<PricebookEntry> filterProducts(String name, Double maxPrice, List<String> colors, List<String> sizes){
        name = '%' + name + '%';
        List<PricebookEntry> entries = Database.query(KEC_ProductFilterHelper.generateFilterQuery(name, maxPrice, colors, sizes));
        return entries;
    }

}