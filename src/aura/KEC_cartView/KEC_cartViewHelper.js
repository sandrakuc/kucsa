/**
 * Created by BRITENET on 14.01.2020.
 */
({
    getCartItems: function(component, event, helper){
        let action = component.get("c.getCartItemsList");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS"){
                let cartItems = response.getReturnValue();
                component.set("v.cartItems", cartItems);
                this.sumTotalPrice(component, event, helper, cartItems);
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
        },
        sumTotalPrice: function(component, event, helper, cartItems){
            let sum = 0;
            for(let i = 0; i < cartItems.length; i++){
                sum += cartItems[i].product.UnitPrice * cartItems[i].quantity;
            }
            component.set("v.totalPrice", sum);
        },
        remove: function(component, event, helper){
            var index = event.currentTarget.id;
            let cartItems = component.get("v.cartItems");
            let product = cartItems[index];
            let action = component.get("c.removeFromCart");
            action.setParams({
                product : product
            });
            action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS"){
                  var operationResult = response.getReturnValue().operationResult,
                       cartItems = response.getReturnValue().cartItems,
                       title = operationResult.isSuccess ? $A.get("$Label.c.KEC_Success") : $A.get("$Label.c.KEC_Error"),
                       type = operationResult.isSuccess ? "success" : "error",
                       message = operationResult.message;
                  component.set("v.cartItems", cartItems);
                  var toastEvent = $A.get("e.force:showToast");
                  toastEvent.setParams({
                       "title": title,
                       "type": type,
                       "message": message
                  });
                  toastEvent.fire();
                  this.getFavorites(component, event, helper);
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
        },
        clear: function(component, event, helper){
            let action = component.get("c.clearCart");
            action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS"){
                 var operationResult = response.getReturnValue().operationResult,
                      cartItems = response.getReturnValue().cartItems,
                      title = operationResult.isSuccess ? $A.get("$Label.c.KEC_Success") : $A.get("$Label.c.KEC_Error"),
                      type = operationResult.isSuccess ? "success" : "error",
                      message = operationResult.message;
                 component.set("v.cartItems", cartItems);
                 var toastEvent = $A.get("e.force:showToast");
                 toastEvent.setParams({
                       "title": title,
                       "type": type,
                       "message": message
                 });
                 toastEvent.fire();
                 this.getFavorites(component, event, helper);
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
        },
        incrementQuantity: function(component, event, helper){
             var index = event.currentTarget.id;
             let cartItems = component.get("v.cartItems");
             let product = cartItems[index];
             let action = component.get("c.incrementProductInCart");
             action.setParams({
                   product : product.product,
                   color : product.color,
                   size : product.size
             });
             action.setCallback(this, function(response) {
                  var state = response.getState();
                  if (state === "SUCCESS"){
                       var operationResult = response.getReturnValue().operationResult,
                            cartItems = response.getReturnValue().cartItems,
                            title = operationResult.isSuccess ? $A.get("$Label.c.KEC_Success") : $A.get("$Label.c.KEC_Error"),
                            type = operationResult.isSuccess ? "success" : "error",
                            message = operationResult.message;
                       component.set("v.cartItems", cartItems);
                       var toastEvent = $A.get("e.force:showToast");
                       toastEvent.setParams({
                            "title": title,
                            "type": type,
                            "message": message
                       });
                       toastEvent.fire();
                       this.getFavorites(component, event, helper);
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
        },
        decrementQuantity: function(component, event, helper){
              var index = event.currentTarget.id;
              let cartItems = component.get("v.cartItems");
              let product = cartItems[index];
              let action = component.get("c.decrementProductInCart");
              action.setParams({
                    product : product
              });
              action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS"){
                          var operationResult = response.getReturnValue().operationResult,
                               cartItems = response.getReturnValue().cartItems,
                               title = operationResult.isSuccess ? $A.get("$Label.c.KEC_Success") : $A.get("$Label.c.KEC_Error"),
                               type = operationResult.isSuccess ? "success" : "error",
                               message = operationResult.message;
                          component.set("v.cartItems", cartItems);
                          console.log(JSON.stringify(cartItems));
                          var toastEvent = $A.get("e.force:showToast");
                          toastEvent.setParams({
                               "title": title,
                               "type": type,
                               "message": message
                          });
                          toastEvent.fire();
                          this.getFavorites(component, event, helper);
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