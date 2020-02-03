/**
 * Created by BRITENET on 07.01.2020.
 */

public with sharing class KEC_ProductFilterHelper {

    public static String generateFilterQuery(String name, Double maxPrice, List<String> colors, List<String> sizes){
        String query = 'SELECT PriceBook2.Name, Product2.Id, Product2.ImgPath__c, Product2.BestPrice__c, Product2.AvailableColors__c, Product2.AvailableSizes__c, Product2.Name, UnitPrice, Name FROM PricebookEntry WHERE  PriceBook2.Name = \''+ System.Label.KEC_StandardPriceBookName +'\' AND Product2.Name LIKE \'' + name + '\'';
        if(maxPrice != null){
            query += ' AND (UnitPrice <= ' + maxPrice + ' OR (Product2.BestPrice__c != null AND Product2.BestPrice__c <=' + maxPrice + '))';
        }
        if(!colors.isEmpty()){
            query += ' AND ';
            for(Integer i = 0; i < colors.size(); i++){
                if(i != 0){
                    query += ' OR ';
                } else {
                    query += '(';
                }
                query += 'Product2.AvailableColors__c LIKE \'%' + colors[i] + '%\'';
                if( i == colors.size()-1){
                    query += ')';
                }
            }
        }
        if(!sizes.isEmpty()){
            query += ' AND ';
            for(Integer i = 0; i < sizes.size(); i++){
                if(i != 0){
                    query += ' OR ';
                } else {
                    query += '(';
                }
                query += 'Product2.AvailableSizes__c LIKE \'%' + sizes[i] + '%\'';
                if( i == sizes.size()-1){
                    query += ')';
                }
            }
        }
        return query;
    }

}