/**
 * Created by BRITENET on 28.01.2020.
 */

public with sharing class KEC_ProductPricesWrapper {

    @AuraEnabled
    public Double discountPrice { get; set; }

    @AuraEnabled
    public Double standardPrice { get; set; }

    @AuraEnabled
    public String productName { get; set; }

    @AuraEnabled
    public String productId { get; set; }

    public KEC_ProductPricesWrapper(){

    }

    public KEC_ProductPricesWrapper(Double discountPrice, Double standardPrice, String productName, String productId){
        this.discountPrice = discountPrice;
        this.standardPrice = standardPrice;
        this.productName = productName;
        this.productId = productId;
    }
}