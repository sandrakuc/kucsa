/**
 * Created by BRITENET on 08.01.2020.
 */
({
    prepareProductView: function(component, event, helper){
        let productId = component.get("v.recordId");
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
             let photoPath = component.get("v.product").Product2.ImgPath__c;
             component.set("v.photoPath", photoPath);
             let productId = component.get("v.product").Product2.Id;
             this.getPhotos(component, event, helper, productId);
             this.getFavorites(component, event, helper, productId);
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
    },
    getPhotos: function(component, event, helper, productId){
        let action = component.get("c.productPhotos");
        action.setParams({
             id : productId
        });
        action.setCallback(this, function(response) {
        var state = response.getState();
        if (state === "SUCCESS"){
              component.set("v.photos", response.getReturnValue());
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
    handleColor: function(component, event, helper){
        let selectedColors = event.getSource().get("v.value");
        component.set("v.selectedColor", selectedColors);
        let favorites = component.get("v.favorites"),
            selectedSize = component.get("v.selectedSize") == null ? component.get("v.availableSizes")[0].label : component.get("v.selectedSize");
        if(favorites != null){
            this.checkIsInFavourites(component, event, helper, favorites, selectedColors, selectedSize);
        }
    },
    handleSize: function(component, event, helper){
        let selectedSize = event.getSource().get("v.value");
        component.set("v.selectedSize", selectedSize);
        let favorites = component.get("v.favorites"),
            selectedColor = component.get("v.selectedColor") == null ? component.get("v.availableColors")[0].label : component.get("v.selectedColor");
        if(favorites != null){
            this.checkIsInFavourites(component, event, helper, favorites, selectedColor, selectedSize);
        }
    },
    getPhoto: function(component, event, helper){
        let photoIndex = event.currentTarget.dataset.id;
        let photos = component.get("v.photos");
        let selectedPhoto = photos[photoIndex];
        component.set("v.photoPath", selectedPhoto.ImgUrl__c);
    },
    favorites: function(component, event, helper){
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
                 this.getFavorites(component, event, helper, productId);
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
    getFavorites: function(component, event, helper, productId){
        let action = component.get("c.checkFavouriteProduct");
        action.setParams({
             id : productId
        });
        action.setCallback(this, function(response) {
        var state = response.getState();
        if (state === "SUCCESS"){
            let favorites = response.getReturnValue();
            component.set("v.favorites", favorites);
            let productSize = component.get("v.selectedSize") != null ? component.get("v.selectedSize") : component.get("v.availableSizes")[0].label,
                productColor = component.get("v.selectedColor") != null ? component.get("v.selectedColor") : component.get("v.availableColors")[0].label;
            if(favorites != null){
                this.checkIsInFavourites(component, event, helper, favorites, productColor, productSize);
            }
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
    checkIsInFavourites: function(component, event, helper, favorites, selectedColor, selectedSize){
        for(let i = 0; i < favorites.length; i++){
            if(favorites[i].Size__c === selectedSize && favorites[i].Color__c === selectedColor){
                component.set("v.isFavorite", true);
                break;
            } else {
                component.set("v.isFavorite", false);
            }
        }
    },
    open: function(component, event, helper){
        component.set("v.openModal", true);
    },
    saveUserOpinion: function(component, event, helper){
        let color = event.getParam("color"),
            size = event.getParam("size"),
            content = event.getParam("content"),
            answer = event.getParam("answer"),
            rate = event.getParam("rate"),
            productId = component.get("v.product").Product2.Id;
        let action = component.get("c.createProductOpinion");
        action.setParams({
            id : productId,
            color : color,
            size : size,
            content : content,
            rating : rate,
            sizeRating : answer
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
    },
    getOpinions: function(component, event, helper, productId){
            let action = component.get("c.productOpinions");
            action.setParams({
                 id : productId
            });
            action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS"){
                  component.set("v.productOpinions", response.getReturnValue());
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
        addToCart: function(component, event, helper){
            let product = component.get("v.product");
            let action = component.get("c.addProductToCart");
            let productSize = component.get("v.selectedSize") != null ? component.get("v.selectedSize") : component.get("v.availableSizes")[0].label,
                 productColor = component.get("v.selectedColor") != null ? component.get("v.selectedColor") : component.get("v.availableColors")[0].label;
            action.setParams({
                product : product,
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