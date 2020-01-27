/**
 * Created by BRITENET on 27.01.2020.
 */
({
    getAccountDetails: function(component){
        let action = component.get("c.getAccountLoyaltyProgramDetails");
        action.setCallback(this, function(response){
             let state = response.getState();
             if (state === "SUCCESS"){
                  let account = response.getReturnValue();
                  component.set("v.account", account);
                  let accountId = account.Id;
                  let loyaltyPoints = account.LoyaltyPoints__c;
                  this.setNextValueToAchieve(component, loyaltyPoints);
                  this.getLoyaltyCoupon(component, accountId);
                  this.afterRender(component);
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
    setNextValueToAchieve: function(component, loyaltyPoints){
        if(loyaltyPoints < 1000){
            component.set("v.nextValue", 1000);
        }
        else if(loyaltyPoints >= 1000 && loyaltyPoints < 2000){
            component.set("v.nextValue", 2000);
        }
        else if(loyaltyPoints >= 2000 && loyaltyPoints < 3000){
            component.set("v.nextValue", 3000);
        }
        else if(loyaltyPoints >= 3000 && loyaltyPoints < 4000){
            component.set("v.nextValue", 4000);
        }
        else{
            component.set("v.nextValue", 5000);
        }
    },
    getLoyaltyCoupon: function(component, accountId){
        let action = component.get("c.getLoyaltyCoupons");
        action.setParams({
            accountId : accountId
        })
        action.setCallback(this, function(response){
             let state = response.getState();
             if (state === "SUCCESS"){
                   let coupon = response.getReturnValue();
                   component.set("v.coupon", coupon);
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
    afterRender: function(component) {
       let svg = component.find("svg_content");
       let value = svg.getElement().innerText;
       value = value.replace("<![CDATA[", "").replace("]]>", "");
       svg.getElement().innerHTML = value;
    }
})