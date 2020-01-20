/**
 * Created by BRITENET on 20.01.2020.
 */

public with sharing class KEC_CaseBuilder {

    private static Account getUserAccount(){
        List<Account> accounts = [SELECT Id FROM Account WHERE Name =: UserInfo.getUserName()];
        return accounts[0];
    }

    public static KEC_OperationResult createCase(String orderId, String subject, String problemDescription){
        Account account = getUserAccount();
        Case userCase = new Case(Status = 'New', Origin = 'Web', AccountId = account.Id, Order__c = orderId, Subject = subject, Description = problemDescription);
        Database.SaveResult result = Database.insert(userCase);
        String message = result.isSuccess() ? System.Label.KEC_OperationSuccess : result.getErrors()[0].getMessage();
        KEC_OperationResult operationResult = new KEC_OperationResult(result.isSuccess(), message);
        return operationResult;
    }
}