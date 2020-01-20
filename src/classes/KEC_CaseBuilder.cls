/**
 * Created by BRITENET on 20.01.2020.
 */

public with sharing class KEC_CaseBuilder {

    private static Account getUserAccount(){
        List<User> users = [SELECT Name FROM User WHERE Id = :UserInfo.getUserId()];
        List<Account> accounts = [SELECT Id FROM Account WHERE Name =: users[0].Name];
        System.debug(UserInfo.getUserName());
        return accounts[0];
    }

    private static AssignmentRule getAssignmentRule(){
        List<AssignmentRule> assignmentRules = [SELECT Id FROM AssignmentRule WHERE SobjectType = 'Case' AND Active = true];
        return assignmentRules[0];
    }

    private static Database.DMLOptions getAssignmentDmlOptions(){
        Database.DMLOptions dmlOptions = new Database.DMLOptions();
        dmlOptions.assignmentRuleHeader.assignmentRuleId=getAssignmentRule().Id;
        return dmlOptions;
    }

    public static KEC_OperationResult createCase(String orderId, String subject, String problemDescription){
        Account account = getUserAccount();
        Case userCase = new Case(Status = 'New', Origin = 'Web', AccountId = account.Id, Order__c = orderId, Subject = subject, Description = problemDescription);
        userCase.setOptions(getAssignmentDmlOptions());
        Database.SaveResult result = Database.insert(userCase);
        String message = result.isSuccess() ? System.Label.KEC_OperationSuccess : result.getErrors()[0].getMessage();
        KEC_OperationResult operationResult = new KEC_OperationResult(result.isSuccess(), message);
        return operationResult;
    }
}