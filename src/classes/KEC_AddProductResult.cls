/**
 * Created by BRITENET on 24.01.2020.
 */

public with sharing class KEC_AddProductResult {

    @AuraEnabled
    public KEC_OperationResult operationResult { get; set; }

    @AuraEnabled
    public String productId { get; set; }

    public KEC_AddProductResult(){

    }

    public KEC_AddProductResult(KEC_OperationResult operationResult, String productId){
        this.operationResult = operationResult;
        this.productId = productId;
    }
}