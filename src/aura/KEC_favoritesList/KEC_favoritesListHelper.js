/**
 * Created by BRITENET on 10.01.2020.
 */
({
    getFavorites: function(component){
        let action = component.get('c.getFavoritesItemsForUser');
        action.setCallback(this, function(response){
        let state = response.getState();
        if (state === "SUCCESS"){
             component.set("v.favorites", response.getReturnValue());
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
    removeFromFavorites: function(component, event){
        let index = event.currentTarget.id;
        let favorites = component.get("v.favorites");
        let favoriteId = favorites[index].Id;
        let action = component.get("c.removeFromFavourites");
        action.setParams({
             id : favoriteId
        });
        action.setCallback(this, function(response){
             let state = response.getState();
             if (state === "SUCCESS"){
                   let operationResult = response.getReturnValue(),
                        title = operationResult.isSuccess ? $A.get("$Label.c.KEC_Success") : $A.get("$Label.c.KEC_Error"),
                        type = operationResult.isSuccess ? "success" : "error",
                        message = operationResult.message;
                   component.find("toastCmp").toast(title, type, message);
                   this.getFavorites(component);
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
    redirectToViewPage: function(component, event){
         let index = event.currentTarget.id;
         let products = component.get("v.favorites");
         let productId = products[index].Entry__c;
         let urlAddress = '/productview?recordId='+productId;
         component.find("redirectCmp").redirectToSite(urlAddress);
    },
    addToCart: function(component, event, helper){
        var index = event.currentTarget.id;
        let favorites = component.get("v.favorites");
        let productId = favorites[index].Entry__c,
            productColor = favorites[index].Color__c,
            productSize = favorites[index].Size__c;
        let action = component.get("c.addProductToCart");
        action.setParams({
             id : productId,
             color: productColor,
             size: productSize
        });
        action.setCallback(this, function(response) {
             var state = response.getState();
             if (state === "SUCCESS"){
                  var operationResult = response.getReturnValue(),
                       title = operationResult.isSuccess ? $A.get("$Label.c.KEC_Success") : $A.get("$Label.c.KEC_Error"),
                       type = operationResult.isSuccess ? "success" : "error",
                       message = operationResult.message;
                  var toastEvent = $A.get("e.force:showToast");
                  toastEvent.setParams({
                       "title": title,
                       "type": type,
                       "message": message
                  });
                  toastEvent.fire();
                  this.getOpinions(component, event, helper, productId);
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