/**
 * Created by BRITENET on 20.01.2020.
 */
({
    getCases: function(component){
        let orderId = component.get("v.recordId");
        let action = component.get("c.getOrderCases");
        action.setParams({
            orderId : orderId
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS"){
                 let cases = response.getReturnValue();
                 component.set("v.cases", cases);
            }
            else if (state === "ERROR"){
                let errors = response.getError();
                let message,
                     title = $A.get("$Label.c.KEC_Error");
                if (errors){
                     if (errors[0] && errors[0].message){
                          message = errors[0].message;
                          component.find("toastCmp").toast(title, "error", message);
                     }
                }
                else{
                     message = $A.get("$Label.c.KEC_UnknownError");
                     component.find("toastCmp").toast(title, "error", message);
                }
            }
        });
        $A.enqueueAction(action);
    },
    setCase: function(component){
        let index = component.get("v.index"),
            cases = component.get("v.cases");
        let orderCase = cases[index];
        component.set("v.case", orderCase);
        this.getAnswers(component, orderCase.Id);
        this.getOrderItems(component, orderCase.Order__c);
    },
    getAnswers: function(component, caseId){
        let action = component.get("c.getSpecialistAnswers");
        action.setParams({
            caseId : caseId
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS"){
                 let answers = response.getReturnValue();
                 component.set("v.answers", answers);
            }
            else if (state === "ERROR"){
                 let errors = response.getError();
                 let message,
                      title = $A.get("$Label.c.KEC_Error");
                 if (errors){
                      if (errors[0] && errors[0].message){
                            message = errors[0].message;
                            component.find("toastCmp").toast(title, "error", message);
                      }
                 }
                 else{
                      message = $A.get("$Label.c.KEC_UnknownError");
                      component.find("toastCmp").toast(title, "error", message);
                 }
            }
        });
        $A.enqueueAction(action);
    },
    getOrderItems: function(component, orderId){
        let action = component.get("c.getOrderItems");
        action.setParams({
             orderId : orderId
        });
        action.setCallback(this, function(response){
             let state = response.getState();
             if (state === "SUCCESS"){
                   let orderItems = response.getReturnValue();
                   component.set("v.orderItems", orderItems);
             }
             else if (state === "ERROR"){
                   let errors = response.getError();
                   let message,
                        title = $A.get("$Label.c.KEC_Error");
                   if (errors){
                        if (errors[0] && errors[0].message){
                             message = errors[0].message;
                             component.find("toastCmp").toast(title, "error", message);
                        }
                   }
                   else{
                        message = $A.get("$Label.c.KEC_UnknownError");
                        component.find("toastCmp").toast(title, "error", message);
                   }
             }
        });
        $A.enqueueAction(action);
    }
})