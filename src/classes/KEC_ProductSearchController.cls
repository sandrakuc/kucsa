/**
 * Created by BRITENET on 06.01.2020.
 */

public with sharing class KEC_ProductSearchController {
    @AuraEnabled
    public static List<PricebookEntry> searchProducts(String name){
        name = '%' + name + '%';
        List<PricebookEntry> entries = [SELECT PriceBook2.Name, Product2.Id, Product2.ImgPath__c, Product2.Name, UnitPrice, Name FROM PricebookEntry WHERE  PriceBook2.Name = 'Kucsa Price Book' AND Product2.Name LIKE :name];
        return entries;
    }

}