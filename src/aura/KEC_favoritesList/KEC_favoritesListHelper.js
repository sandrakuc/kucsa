/**
 * Created by BRITENET on 10.01.2020.
 */
({
    getFavorites: function(component, event, helper){
        let action = component.get('c.getFavoritesItemsForUser');
        action.setCallback(this, function(response) {
        var state = response.getState();
        if (state === "SUCCESS"){
             component.set("v.favorites", response.getReturnValue());
        }
        else if (state === "ERROR") {
              var errors = response.getError();
              var message,
                    title = $A.get("$Label.c.KEC_Error");
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
})