/**
 * Created by BRITENET on 06.01.2020.
 */
({
    search: function(component){
        let action = component.get("c.searchProducts");
        action.setParams({
             name : component.get("v.productName")
        });
        action.setCallback(this, function(response){
             let state = response.getState();
             if (state === "SUCCESS"){
                  component.set("v.resultList", response.getReturnValue());
             }
              else if (state === "ERROR") {
                  let message,
                    title = $A.get("$Label.c.KEC_Error");
                  let errors = response.getError();
                  if (errors) {
                        if (errors[0] && errors[0].message){
                            message = errors[0].message;
                            component.find("toastCmp").toast(title, "error", message);
                        }
                  }
                  else {
                      message = $A.get("$Label.c.KEC_UnknownError");
                      component.find("toastCmp").toast(title, "error", message);
                  }
              }
        });
        $A.enqueueAction(action);
    },
    filter: function(component, event){
        if(component.get("v.productName") != null){
            let action = component.get("c.filterProducts");
            action.setParams({
                 name : component.get("v.productName"),
                 maxPrice : event.getParam("maxPrice"),
                 colors : event.getParam("colors"),
                 sizes : event.getParam("sizes")
            });
            action.setCallback(this, function(response){
            let state = response.getState();
                 if (state === "SUCCESS"){
                      component.set("v.resultList", response.getReturnValue());
                 }
                 else if (state === "ERROR") {
                      let message,
                          title = $A.get("$Label.c.KEC_Error");
                      let errors = response.getError();
                      if (errors) {
                            if (errors[0] && errors[0].message){
                                message = errors[0].message;
                                component.find("toastCmp").toast(title, "error", message);
                            }
                      }
                      else {
                            message = $A.get("$Label.c.KEC_UnknownError");
                            component.find("toastCmp").toast(title, "error", message);
                      }
                 }
            });
            $A.enqueueAction(action);
        }
    }
})