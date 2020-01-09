/**
 * Created by BRITENET on 08.01.2020.
 */
({
    prepareProductView: function(component, event, helper){
        let productId = component.get("v.recordId");
        console.log(productId);
        let action = component.get("c.getProductInfo");
        action.setParams({
            id : productId
        });
        action.setCallback(this, function(response) {
        var state = response.getState();
        if (state === "SUCCESS"){
             component.set("v.product", response.getReturnValue());
             let colors = component.get("v.product").Product2.AvailableColors__c.split(',');
             let sizes = component.get("v.product").Product2.AvailableSizes__c.split(',');
             let availableColors = [];
             let availableSizes = [];
             for(let i = 0; i < colors.length; i++){
                  let option = { 'label' : colors[i], 'colors' : colors[i] };
                  availableColors.push(option);
             }
             for(let i = 0; i < sizes.length; i++){
                  let option = { 'label' : sizes[i], 'sizes' : sizes[i] };
                  availableSizes.push(option);
             }
             component.set("v.availableSizes", availableSizes);
             component.set("v.availableColors", availableColors);
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