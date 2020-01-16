/**
 * Created by BRITENET on 14.01.2020.
 */

public with sharing class KEC_PriceBookEntryWrapper {

    @AuraEnabled
    public PricebookEntry product { get; set; }

    @AuraEnabled
    public String color { get; set; }

    @AuraEnabled
    public String size { get; set; }

    @AuraEnabled
    public Integer quantity { get; set; }

    public KEC_PriceBookEntryWrapper(){

    }

    public KEC_PriceBookEntryWrapper(PricebookEntry product, String color, String size){
        this.product = product;
        this.color = color;
        this.size = size;
    }

    public Boolean equals(KEC_PriceBookEntryWrapper priceBookEntryWrapper){
        return this.product.Id.equals(priceBookEntryWrapper.product.Id) && this.color.equals(priceBookEntryWrapper.color) && this.size.equals(priceBookEntryWrapper.size);
    }

}