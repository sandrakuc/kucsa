/**
 * Created by BRITENET on 14.01.2020.
 */

public with sharing class KEC_CartWrapper {

    @AuraEnabled
    public List<KEC_PriceBookEntryWrapper> cartItems { get; set; }

    @AuraEnabled
    public KEC_OperationResult operationResult { get; set; }

    public KEC_CartWrapper(List<KEC_PriceBookEntryWrapper> cartItems, KEC_OperationResult operationResult){
        this.cartItems = cartItems;
        this.operationResult = operationResult;
    }

}