/**
 * Created by BRITENET on 06.01.2020.
 */
({
    search: function(component, event, helper){
        let action = component.get("c.searchProducts");
        console.log(component.get("v.productName"));
        action.setParams({
             name : component.get("v.productName")
        });
        action.setCallback(this, function(response) {
             var state = response.getState();
             if (state === "SUCCESS"){
                  component.set("v.resultList", response.getReturnValue());
                  console.log("results: " + component.get("v.resultList.length"));
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
})