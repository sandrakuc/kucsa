/**
 * Created by BRITENET on 14.01.2020.
 */
({
    getCartItems: function(component){
        let action = component.get("c.getCartItemsList");
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS"){
                let cartItems = response.getReturnValue();
                component.set("v.cartItems", cartItems);
                this.sumTotalPrice(component, cartItems);
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
        sumTotalPrice: function(component, cartItems){
            let sum = 0;
            for(let i = 0; i < cartItems.length; i++){
                sum += cartItems[i].product.UnitPrice * cartItems[i].quantity;
            }
            component.set("v.totalPrice", sum);
        },
        remove: function(component, event){
            let index = event.currentTarget.id;
            let cartItems = component.get("v.cartItems");
            let product = cartItems[index];
            let action = component.get("c.removeFromCart");
            action.setParams({
                product : product
            });
            action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS"){
                  let operationResult = response.getReturnValue().operationResult,
                       cartItems = response.getReturnValue().cartItems,
                       title = operationResult.isSuccess ? $A.get("$Label.c.KEC_Success") : $A.get("$Label.c.KEC_Error"),
                       type = operationResult.isSuccess ? "success" : "error",
                       message = operationResult.message;
                  component.set("v.cartItems", cartItems);
                  this.sumTotalPrice(component, cartItems);
                  this.refreshCart(component);
                  component.find("toastCmp").toast(title, type, message);
            }
            else if (state === "ERROR"){
                  let errors = response.getError();
                  let message,
                       title = $A.get("$Label.c.KEC_Error");
                  if (errors){
                       if (errors[0] && errors[0].message){
                             message = errors[0].message;
                             var toastEvent = $A.get("e.force:showToast");
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
        clear: function(component){
            let action = component.get("c.clearCart");
            action.setCallback(this, function(response){
                let state = response.getState();
                if (state === "SUCCESS"){
                     let operationResult = response.getReturnValue().operationResult,
                          cartItems = response.getReturnValue().cartItems,
                          title = operationResult.isSuccess ? $A.get("$Label.c.KEC_Success") : $A.get("$Label.c.KEC_Error"),
                          type = operationResult.isSuccess ? "success" : "error",
                          message = operationResult.message;
                     component.set("v.cartItems", cartItems);
                     this.sumTotalPrice(component, cartItems);
                     this.refreshCart(component);
                     component.find("toastCmp").toast(title, type, message);
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
        incrementQuantity: function(component, event){
             let index = event.currentTarget.id;
             let cartItems = component.get("v.cartItems");
             let product = cartItems[index];
             let action = component.get("c.incrementProductInCart");
             action.setParams({
                   product : product.product,
                   color : product.color,
                   size : product.size
             });
             action.setCallback(this, function(response){
                  let state = response.getState();
                  if (state === "SUCCESS"){
                       let operationResult = response.getReturnValue().operationResult,
                            cartItems = response.getReturnValue().cartItems,
                            title = operationResult.isSuccess ? $A.get("$Label.c.KEC_Success") : $A.get("$Label.c.KEC_Error"),
                            type = operationResult.isSuccess ? "success" : "error",
                            message = operationResult.message;
                       component.set("v.cartItems", cartItems);
                       this.sumTotalPrice(component, cartItems);
                       this.refreshCart(component);
                       component.find("toastCmp").toast(title, type, message);
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
        decrementQuantity: function(component, event){
              let index = event.currentTarget.id;
              let cartItems = component.get("v.cartItems");
              let product = cartItems[index];
              let action = component.get("c.decrementProductInCart");
              action.setParams({
                    product : product
              });
              action.setCallback(this, function(response){
                    let state = response.getState();
                    if (state === "SUCCESS"){
                          let operationResult = response.getReturnValue().operationResult,
                               cartItems = response.getReturnValue().cartItems,
                               title = operationResult.isSuccess ? $A.get("$Label.c.KEC_Success") : $A.get("$Label.c.KEC_Error"),
                               type = operationResult.isSuccess ? "success" : "error",
                               message = operationResult.message;
                          component.set("v.cartItems", cartItems);
                          this.sumTotalPrice(component, cartItems);
                          this.refreshCart(component);
                          component.find("toastCmp").toast(title, type, message);
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
            let products = component.get("v.cartItems");
            let productId = products[index].product.Id;
            let urlAddress = '/productview?recordId='+productId;
            component.find("redirectCmp").redirectToSite(urlAddress);
        },
        refreshCart: function(component){
            let appEvent = $A.get("e.c:KEC_refreshCartBadge");
            appEvent.fire();
        },
        orderProducts: function(component){
            let action = component.get("c.order");
            action.setParams({
                code : component.get("v.discountCode")
            })
            action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS"){
                 let operationResult = response.getReturnValue().operationResult,
                      cartItems = response.getReturnValue().cartItems,
                      title = operationResult.isSuccess ? $A.get("$Label.c.KEC_Success") : $A.get("$Label.c.KEC_Error"),
                      type = operationResult.isSuccess ? "success" : "error",
                      message = operationResult.message;
                 component.set("v.cartItems", cartItems);
                 this.sumTotalPrice(component, cartItems);
                 this.refreshCart(component);
                 component.find("toastCmp").toast(title, type, message);
                 this.close(component);
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
        open: function(component){
            component.set("v.openModal", true);
        },
        close: function(component){
            component.set("v.openModal", false);
        }
})