/**
 * Created by BRITENET on 08.01.2020.
 */
({
    prepareProductView: function(component){
        let productId = component.get("v.recordId");
        let action = component.get("c.getProductInfo");
        action.setParams({
            id : productId
        });
        action.setCallback(this, function(response){
        let state = response.getState();
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
             let photoPath = component.get("v.product").Product2.ImgPath__c;
             component.set("v.photoPath", photoPath);
             let productId = component.get("v.product").Product2.Id;
             this.getPhotos(component, productId);
             this.getFavorites(component, productId);
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
    getPhotos: function(component, productId){
        let action = component.get("c.productPhotos");
        action.setParams({
             id : productId
        });
        action.setCallback(this, function(response){
        let state = response.getState();
        if (state === "SUCCESS"){
              component.set("v.photos", response.getReturnValue());
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
    handleColor: function(component, event){
        let selectedColors = event.getSource().get("v.value");
        component.set("v.selectedColor", selectedColors);
        let favorites = component.get("v.favorites"),
            selectedSize = component.get("v.selectedSize") == null ? component.get("v.availableSizes")[0].label : component.get("v.selectedSize");
        if(favorites != null){
            this.checkIsInFavourites(component, favorites, selectedColors, selectedSize);
        }
    },
    handleSize: function(component, event){
        let selectedSize = event.getSource().get("v.value");
        component.set("v.selectedSize", selectedSize);
        let favorites = component.get("v.favorites"),
            selectedColor = component.get("v.selectedColor") == null ? component.get("v.availableColors")[0].label : component.get("v.selectedColor");
        if(favorites != null){
            this.checkIsInFavourites(component, favorites, selectedColor, selectedSize);
        }
    },
    getPhoto: function(component, event){
        let photoIndex = event.currentTarget.dataset.id;
        let photos = component.get("v.photos");
        let selectedPhoto = photos[photoIndex];
        component.set("v.photoPath", selectedPhoto.ImgUrl__c);
    },
    favorites: function(component){
        let product = component.get("v.product");
        let productId = product.Product2.Id;
        let productPrice = product.UnitPrice;
        let productSize = component.get("v.selectedSize") != null ? component.get("v.selectedSize") : component.get("v.availableSizes")[0].label;
        let productColor = component.get("v.selectedColor") != null ? component.get("v.selectedColor") : component.get("v.availableColors")[0].label;
        let entry = product.Id;
        let action = component.get("c.addToFavouritesList");
        action.setParams({
            id : productId,
            price : productPrice,
            size : productSize,
            color : productColor,
            entry : entry
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS"){
                 let operationResult = response.getReturnValue(),
                    title = operationResult.isSuccess ? $A.get("$Label.c.KEC_Success") : $A.get("$Label.c.KEC_Error"),
                    type = operationResult.isSuccess ? "success" : "error",
                    message = operationResult.message;
                 let toastEvent = $A.get("e.force:showToast");
                 toastEvent.setParams({
                     "title": title,
                     "type": type,
                     "message": message
                 });
                 toastEvent.fire();
                 this.getFavorites(component, productId);
            }
            else if (state === "ERROR"){
                let errors = response.getError();
                let message,
                     title = $A.get("$Label.c.KEC_Error");
                if (errors) {
                     if (errors[0] && errors[0].message){
                           message = errors[0].message;
                           let toastEvent = $A.get("e.force:showToast");
                           toastEvent.setParams({
                                "title": title,
                                "type": "error",
                                "message": message
                           });
                           toastEvent.fire();
                     }
                }
                else {
                     message = $A.get("$Label.c.KEC_UnknownError");
                     let toastEvent = $A.get("e.force:showToast");
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
    getFavorites: function(component, productId){
        let action = component.get("c.checkFavouriteProduct");
        action.setParams({
             id : productId
        });
        action.setCallback(this, function(response){
        let state = response.getState();
        if (state === "SUCCESS"){
            let favorites = response.getReturnValue();
            component.set("v.favorites", favorites);
            let productSize = component.get("v.selectedSize") != null ? component.get("v.selectedSize") : component.get("v.availableSizes")[0].label,
                productColor = component.get("v.selectedColor") != null ? component.get("v.selectedColor") : component.get("v.availableColors")[0].label;
            if(favorites != null){
                this.checkIsInFavourites(component, favorites, productColor, productSize);
            }
        }
        else if (state === "ERROR"){
              let errors = response.getError();
              let message,
                   title = $A.get("$Label.c.KEC_Error");
              if (errors){
                    if (errors[0] && errors[0].message){
                          message = errors[0].message;
                          let toastEvent = $A.get("e.force:showToast");
                          toastEvent.setParams({
                                "title": title,
                                "type": "error",
                                "message": message
                          });
                          toastEvent.fire();
                    }
              }
              else{
                     message = $A.get("$Label.c.KEC_UnknownError");
                     let toastEvent = $A.get("e.force:showToast");
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
    checkIsInFavourites: function(component, favorites, selectedColor, selectedSize){
        for(let i = 0; i < favorites.length; i++){
            if(favorites[i].Size__c === selectedSize && favorites[i].Color__c === selectedColor){
                component.set("v.isFavorite", true);
                break;
            }
            else{
                component.set("v.isFavorite", false);
            }
        }
    }
})