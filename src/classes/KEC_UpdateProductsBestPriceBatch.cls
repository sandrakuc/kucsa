/**
 * Created by BRITENET on 02.02.2020.
 */

global class KEC_UpdateProductsBestPriceBatch implements Database.Batchable<sObject>, Database.AllowsCallouts{

    global Database.QueryLocator start(Database.BatchableContext batchableContext){
        String query = 'SELECT Id, Product2Id FROM PricebookEntry';
        return Database.getQueryLocator(query);
    }

    global void execute(Database.BatchableContext batchableContext, List<PricebookEntry> scope){
        KEC_BestPriceSearcherHelper.updateProducts(scope);
    }

    global void finish(Database.BatchableContext batchableContext){
    }

}