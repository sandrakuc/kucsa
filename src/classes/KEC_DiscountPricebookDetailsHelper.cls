/**
 * Created by BRITENET on 28.01.2020.
 */

public with sharing class KEC_DiscountPricebookDetailsHelper {

    private static List<PricebookEntry> getDiscountPricebookEntries(String pricebookId){
        List<PricebookEntry> pricebookEntries = [SELECT Product2.Id, Product2.Name, UnitPrice FROM PricebookEntry WHERE Pricebook2.Id = :pricebookId];
        return pricebookEntries;
    }

    private static List<String> getProductIds(List<PricebookEntry> discountPricebookEntries){
        List<String> productIds = new List<String>();
        for(PricebookEntry entry : discountPricebookEntries){
            productIds.add(entry.Product2.Id);
        }
        return productIds;
    }

    private static List<PricebookEntry> getStandardPricebookEntries(List<String> productIds){
        List<PricebookEntry> standardPricebookEntries = [SELECT Product2.Id, Product2.Name, UnitPrice FROM PricebookEntry WHERE Pricebook2.Name = :System.Label.KEC_StandardPriceBookName AND Product2.Id IN :productIds];
        return standardPricebookEntries;
    }

    private static List<KEC_ProductPricesWrapper> getProductPricesWrappers(List<PricebookEntry> discountEntries, List<PricebookEntry> standardEntries){
        List<KEC_ProductPricesWrapper> productPricesWrappers = new List<KEC_ProductPricesWrapper>();
        for(PricebookEntry discountEntry : discountEntries){
            for(PricebookEntry standardEntry : standardEntries){
                if(standardEntry.Product2.Id.equals(discountEntry.Product2.Id)) {
                    KEC_ProductPricesWrapper productPricesWrapper = new KEC_ProductPricesWrapper((Double)discountEntry.UnitPrice, (Double)standardEntry.UnitPrice, discountEntry.Product2.Name, discountEntry.Product2.Id);
                    productPricesWrappers.add(productPricesWrapper);
                }
            }
        }
        return productPricesWrappers;
    }

    public static List<KEC_ProductPricesWrapper> getDiscountPricebookDetails(String pricebookId){
        List<PricebookEntry> discountEntries = getDiscountPricebookEntries(pricebookId);
        List<String> productIds = getProductIds(discountEntries);
        List<PricebookEntry> standardEntries = getStandardPricebookEntries(productIds);
        List<KEC_ProductPricesWrapper> productPricesWrappers = getProductPricesWrappers(discountEntries, standardEntries);
        return productPricesWrappers;
    }

}