/**
 * Created by BRITENET on 16.01.2020.
 */
({
    redirectToSite: function(component, urlAddress){
        component.find("redirectCmp").redirectToSite(urlAddress);
    },
    getCartItems: function(component){
         let action = component.get("c.getCartItemsList");
         action.setCallback(this, function(response){
         let state = response.getState();
         if (state === "SUCCESS"){
              let cartItems = response.getReturnValue();
              this.sumItems(component, cartItems);
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
    sumItems: function(component, cartItems){
         let sum = 0;
         for(let i = 0; i < cartItems.length; i++){
               sum += cartItems[i].quantity;
         }
         component.set("v.cartItemsValue", sum);
    }

})