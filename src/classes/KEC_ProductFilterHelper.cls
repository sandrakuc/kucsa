/**
 * Created by BRITENET on 07.01.2020.
 */

public with sharing class KEC_ProductFilterHelper {

    private static Boolean checkColorIn(List<String> productColors, List<String> selectedColors){
        for(String color : productColors){
            if(selectedColors.contains(color)){
                return true;
            }
        }
        return false;
    }

    private static Boolean checkSizeIn(List<String> productSizes, List<String> selectedSizes){
        for(String size : productSizes){
            if(selectedSizes.contains(size)){
                return true;
            }
        }
        return false;
    }

    public static List<PricebookEntry> filterByColors(List<PricebookEntry> entries, List<String> selectedColors){
        List<PricebookEntry> newEntries = new List<PricebookEntry>();
        for(PricebookEntry entry : entries){
            List<String> productColors = entry.Product2.AvailableColors__c.split(',');
            if(checkColorIn(productColors, selectedColors)){
                newEntries.add(entry);
            }
        }
        return newEntries;
    }

    public static List<PricebookEntry> filterBySizes(List<PricebookEntry> entries, List<String> selectedSizes){
        List<PricebookEntry> newEntries = new List<PricebookEntry>();
        for(PricebookEntry entry : entries){
            List<String> productSizes = entry.Product2.AvailableSizes__c.split(',');
            if(checkSizeIn(productSizes, selectedSizes)){
                newEntries.add(entry);
            }
        }
        return newEntries;
    }

}