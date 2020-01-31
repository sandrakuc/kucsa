/**
 * Created by BRITENET on 28.01.2020.
 */
({
    getPricebooks: function(component){
         let action = component.get("c.getDiscountsPricebooks");
         action.setCallback(this, function(response){
              let state = response.getState();
              if (state === "SUCCESS"){
                   let pricebooks = response.getReturnValue();
                   component.set("v.pricebooks", pricebooks);
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
    getPricebookDetails: function(component){
        let index = component.get("v.index"),
            pricebooks = component.get("v.pricebooks"),
            pricebook = pricebooks[index],
            pricebookId = pricebook.Id;
        component.set("v.pricebook", pricebook);
        let action = component.get("c.getDiscountPricebookDetails");
        action.setParams({
            pricebookId : pricebookId
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS"){
                 let productPriceWrappers = response.getReturnValue();
                 component.set("v.productPriceWrappers", productPriceWrappers);
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
    searchProducts: function(component){
        let selectedItems = component.get("v.productPriceWrappers");
        let productName = component.get("v.productName"),
            selectedType = component.get("v.selectedType"),
            discountValue = component.get("v.discountValue");
        let action = component.get("c.getProductsToDiscount");
        action.setParams({
            productName : productName,
            discountType : selectedType,
            discountValue : discountValue
        });
        action.setCallback(this, function(response){
             let state = response.getState();
             if (state === "SUCCESS"){
                 let searchResults = response.getReturnValue();
                 this.setChecked(component, searchResults, selectedItems, selectedType, discountValue);
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
    saveDiscountPricebook: function(component){
        let isNew = component.get("v.isNew"),
            pricebook = component.get("v.pricebook"),
            pricebookId = isNew ? null : pricebook.Id,
            pricebookName = component.get("v.pricebookName"),
            discountType = component.get("v.selectedType"),
            discountValue = component.get("v.discountValue"),
            startDate = component.get("v.startDate"),
            endDate = component.get("v.endDate"),
            selectedItems = component.get("v.selectedItems");
        let action = component.get("c.savePricebook");
        action.setParams({
            pricebookId : pricebookId,
            pricebookName : pricebookName,
            discountType : discountType,
            discountValue : discountValue,
            startDate : startDate,
            endDate : endDate,
            productPricesWrappers : selectedItems
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS"){
                 let operationResult = response.getReturnValue(),
                      title = operationResult.isSuccess ? $A.get("$Label.c.KEC_Success") : $A.get("$Label.c.KEC_Error"),
                      type = operationResult.isSuccess ? "success" : "error",
                      message = operationResult.message;
                 component.find("toastCmp").toast(title, type, message);
                 component.set("v.openModal", false);
                 this.getPricebooks(component);
                 if(!isNew){
                     this.getPricebookDetails(component);
                     pricebook.Name = pricebookName;
                     component.set("v.pricebook", pricebook);
                 }
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
    setChecked: function(component, searchResults, selectedItems, selectedType, discountValue){
        let isNew = component.get("v.isNew");
        if(selectedItems.length != 0 && !isNew){
            for(let i = 0; i < searchResults.length; i++){
                  for(let j = 0; j < selectedItems.length; j++){
                       if(selectedItems[j].productId === searchResults[i].productId){
                            searchResults[i].discountPrice = selectedItems[j].discountPrice;
                            searchResults[i].isInItems = true;
                            let discount;
                            if(selectedType === $A.get("$Label.c.KEC_Percent")){
                                discount = ((searchResults[i].standardPrice - searchResults[i].discountPrice)*100)/searchResults[i].standardPrice;
                                selectedItems[j].discountPrice = selectedItems[j].standardPrice - (selectedItems[j].standardPrice * discount)/100;
                            }
                            else {
                                discount = searchResults[i].standardPrice - searchResults[i].discountPrice;
                                selectedItems[j].discountPrice = selectedItems[j].standardPrice - discount;
                            }
                            searchResults[i].specialDiscount = discount === discountValue ? '' : discount;
                       }
                  }
            }
        }
        component.set("v.searchResults", searchResults);
        component.set("v.selectedItems", selectedItems);
    },
    deletePriceBook : function(component){
        let pricebookId = component.get("v.pricebook").Id;
        let action = component.get("c.deletePricebook");
        action.setParams({
            pricebookId : pricebookId
        })
        action.setCallback(this, function(response){
             let state = response.getState();
             if (state === "SUCCESS"){
                  let operationResult = response.getReturnValue(),
                       title = operationResult.isSuccess ? $A.get("$Label.c.KEC_Success") : $A.get("$Label.c.KEC_Error"),
                       type = operationResult.isSuccess ? "success" : "error",
                       message = operationResult.message;
                  component.find("toastCmp").toast(title, type, message);
                  this.getPricebooks(component);
                  let productPriceWrappers = [];
                  component.set("v.productPriceWrappers", productPriceWrappers);
                  component.set("v.pricebook", null);
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