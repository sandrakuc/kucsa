/**
 * Created by BRITENET on 10.01.2020.
 */

public with sharing class KEC_FavoritesListController {

    @AuraEnabled
    public static List<KEC_FavouriteProduct__c> getFavoritesItemsForUser(){
        List<KEC_FavouriteProduct__c> favorites = [SELECT Id, Entry__c, Price__c, Size__c, Color__c, Product__c, Product__r.Name, Product__r.ImgPath__c FROM KEC_FavouriteProduct__c WHERE User__c = :UserInfo.getUserId()];
        return favorites;
    }

}