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
                  this.getLoyaltyCoupon(component, accountId);
                  this.setNextValueToAchieve(component, loyaltyPoints);
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
            this.setDValue(component, loyaltyPoints, 1000);
        }
        else if(loyaltyPoints >= 1000 && loyaltyPoints < 2000){
            component.set("v.nextValue", 2000);
            this.setDValue(component, loyaltyPoints, 2000);
        }
        else if(loyaltyPoints >= 2000 && loyaltyPoints < 3000){
            component.set("v.nextValue", 3000);
            this.setDValue(component, loyaltyPoints, 3000);
        }
        else if(loyaltyPoints >= 3000 && loyaltyPoints < 4000){
            component.set("v.nextValue", 4000);
            this.setDValue(component, loyaltyPoints, 4000);
        }
        else{
            component.set("v.nextValue", 5000);
            this.setDValue(component, loyaltyPoints, 5000);
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
    setDValue: function(component, loyaltyPoints, nextValue){
        let xmlns = "http://www.w3.org/2000/svg",
             updateContainer = document.getElementById("progressContainer"),
             half = loyaltyPoints / nextValue >= 0.5 ? "1" : "0",
             dValue = "M 1 0 A 1 1 0 " + half + " 1 "+
                  Math.cos(2 * Math.PI * loyaltyPoints/nextValue) + " " +
                  Math.sin(2 * Math.PI * loyaltyPoints/nextValue) + " L 0 0",
             svg = document.createElementNS(xmlns,"svg"),
             path = document.createElementNS(xmlns,"path");
             svg.setAttributeNS(null,"viewBox", "-1 -1 2 2");
             path.setAttributeNS(null, "class", "slds-progress-ring__path");
             path.setAttributeNS(null, "d", dValue);
             svg.appendChild(path);
             updateContainer.appendChild(svg);
    }
})