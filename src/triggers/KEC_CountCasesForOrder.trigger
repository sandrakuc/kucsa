/**
 * Created by BRITENET on 23.01.2020.
 */

trigger KEC_CountCasesForOrder on Case (after insert, after delete, after undelete) {

    List<Id> orderIdList = new List<Id>();
    if(Trigger.isInsert || Trigger.isUndelete){
        for(Case newCase : Trigger.new){
            orderIdList.add(newCase.Order__c);
        }
    }
    if(Trigger.isDelete){
        for(Case newCase : Trigger.old){
            orderIdList.add(newCase.Order__c);
        }
    }
    List<Order> orderUpdateList = new List<Order>();
    List<Order> orders = [SELECT Number_Of_Cases__c, (SELECT Id FROM Cases__r) FROM Order WHERE Id =: orderIdList];
    for(Order order : orders){
        order.Number_Of_Cases__c = order.Cases__r.size();
        orderUpdateList.add(order);
    }
    update orderUpdateList;

}