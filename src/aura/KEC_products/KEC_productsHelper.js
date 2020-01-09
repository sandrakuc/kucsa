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
                  var message,
                    title = $A.get("$Label.c.KEC_Error");
                  var errors = response.getError();
                  if (errors) {
                        if (errors[0] && errors[0].message) {
                            message = errors[0].message;
                            var toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                 "title": title,
                                 "type": "error",
                                 "message": message
                            });
                            toastEvent.fire();
                        }
                  } else {
                      message = $A.get("$Label.c.KEC_UnknownError");
                      var toastEvent = $A.get("e.force:showToast");
                      toastEvent.setParams({
                            "title": title,
                            "type": "error",
                            "message": message
                      });
                      toastEvent.fire();
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
                      var message,
                          title = $A.get("$Label.c.KEC_Error");
                      var errors = response.getError();
                      if (errors) {
                            if (errors[0] && errors[0].message) {
                                message = errors[0].message;
                                var toastEvent = $A.get("e.force:showToast");
                                toastEvent.setParams({
                                      "title": title,
                                      "type": "error",
                                      "message": message
                                });
                                toastEvent.fire();
                            }
                      } else {
                            message = $A.get("$Label.c.KEC_UnknownError");
                            var toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                 "title": title,
                                 "type": "error",
                                 "message": message
                            });
                            toastEvent.fire();
                      }
                 }
            });
            $A.enqueueAction(action);
        }
    }
})