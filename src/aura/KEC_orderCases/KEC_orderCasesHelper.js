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
    }
})