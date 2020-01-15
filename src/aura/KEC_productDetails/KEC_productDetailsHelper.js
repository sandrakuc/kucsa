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
    },
    handleSize: function(component, event){
        let selectedSize = event.getSource().get("v.value");
        component.set("v.selectedSize", selectedSize);
    },
    getPhoto: function(component, event){
        let photoIndex = event.currentTarget.dataset.id;
        let photos = component.get("v.photos");
        let selectedPhoto = photos[photoIndex];
        component.set("v.photoPath", selectedPhoto.ImgUrl__c);
    }
})