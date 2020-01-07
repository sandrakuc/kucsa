/**
 * Created by BRITENET on 06.01.2020.
 */
({
    search: function(component, event, helper){
        let action = component.get("c.searchProducts");
        action.setParams({
             name : component.get("v.productName")
        });
        action.setCallback(this, function(response) {
             var state = response.getState();
             if (state === "SUCCESS"){
                  component.set("v.resultList", response.getReturnValue());
             }
              else if (state === "ERROR") {
                  var errors = response.getError();
                  if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + errors[0].message);
                        }
                  } else {
                        console.log("Unknown error");
                  }
              }
        });
        $A.enqueueAction(action);
    },
    filter: function(component, event, helper){
        if(component.get("v.productName") != null){
            let action = component.get("c.filterProducts");
            action.setParams({
                 name : component.get("v.productName"),
                 maxPrice : event.getParam("maxPrice"),
                 colors : event.getParam("colors"),
                 sizes : event.getParam("sizes")
            });
            action.setCallback(this, function(response) {
            var state = response.getState();
                 if (state === "SUCCESS"){
                      component.set("v.resultList", response.getReturnValue());
                 }
                 else if (state === "ERROR") {
                      var errors = response.getError();
                      if (errors) {
                            if (errors[0] && errors[0].message) {
                                 console.log("Error message: " + errors[0].message);
                            }
                      } else {
                            console.log("Unknown error");
                      }
                 }
            });
            $A.enqueueAction(action);
        }
    }
})