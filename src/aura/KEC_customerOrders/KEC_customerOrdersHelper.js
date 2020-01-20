/**
 * Created by BRITENET on 17.01.2020.
 */
({
    getOrdersList: function(component){
        let action = component.get("c.getOrders");
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS"){
                let orders = response.getReturnValue();
                component.set("v.orders", orders);
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
    setOrderDetails: function(component){
        let index = component.get("v.index");
        let orders = component.get("v.orders");
        let order = orders[index];
        console.log(JSON.stringify(order));
        component.set("v.order", order);
        let action = component.get("c.getOrderItems");
        action.setParams({
            orderId : order.Id
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS"){
                 let orderItems = response.getReturnValue();
                 component.set("v.orderItems", orderItems);
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