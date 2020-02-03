/**
 * Created by BRITENET on 31.01.2020.
 */

public with sharing class KEC_BestPriceSearcherHelper {

    private static List<String> getProductIds(List<PricebookEntry> entries){
        List<String> productIds = new List<String>();
        for(PricebookEntry entry : entries){
            productIds.add(entry.Product2Id);
        }
        return productIds;
    }

    private static List<AggregateResult> getMinPrices(List<PricebookEntry> entries){
        List<String> productIds = getProductIds(entries);
        List<AggregateResult> minimumPrices = [SELECT Product2Id, MIN(UnitPrice) minPrice FROM PricebookEntry WHERE Product2Id IN :productIds AND ((Pricebook2.StartDate__c < :Date.today() AND Pricebook2.EndDate__c > :Date.today()) OR (Pricebook2.IsStandard = TRUE)) GROUP BY Product2Id];
        return minimumPrices;
    }

    public static void updateProducts(List<PricebookEntry> entries){
        List<AggregateResult> minimumPrices = getMinPrices(entries);
        List<Product2> productsToUpdate = new List<Product2>();
        for(AggregateResult aggregateResult : minimumPrices){
            Product2 product = new Product2(Id = (String) aggregateResult.get('Product2Id'), BestPrice__c = (Double) aggregateResult.get('minPrice'));
            productsToUpdate.add(product);
        }
        Database.update(productsToUpdate);
    }
}