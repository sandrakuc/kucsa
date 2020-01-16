/**
 * Created by BRITENET on 09.01.2020.
 */

public with sharing class KEC_OperationResult {

    @AuraEnabled
    public Boolean isSuccess { get; set; }

    @AuraEnabled
    public String message { get; set; }

    public KEC_OperationResult(Boolean isSuccess, String message){
        this.isSuccess = isSuccess;
        this.message = message;
    }
}