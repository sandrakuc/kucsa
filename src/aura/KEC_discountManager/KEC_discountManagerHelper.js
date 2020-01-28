/**
 * Created by BRITENET on 28.01.2020.
 */
({
    getPricebooks: function(component){
         let action = component.get("c.getDiscountsPricebooks");
         action.setCallback(this, function(response){
              let state = response.getState();
              if (state === "SUCCESS"){
                   let pricebooks = response.getReturnValue();
                   component.set("v.pricebooks", pricebooks);
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
    getPricebookDetails: function(component){
        let index = component.get("v.index"),
            pricebooks = component.get("v.pricebooks"),
            pricebook = pricebooks[index],
            pricebookId = pricebook.Id;
        component.set("v.pricebook", pricebook);
        let action = component.get("c.getDiscountPricebookDetails");
        action.setParams({
            pricebookId : pricebookId
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS"){
                 let productPriceWrappers = response.getReturnValue();
                 component.set("v.productPriceWrappers", productPriceWrappers);
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