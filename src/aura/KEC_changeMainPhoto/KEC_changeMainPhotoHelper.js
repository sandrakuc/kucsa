/**
 * Created by BRITENET on 22.01.2020.
 */
({
    getPhotos: function(component){
          let recordId = component.get("v.recordId");
          let action = component.get("c.productPhotos");
          action.setParams({
              id : recordId
          });
          action.setCallback(this, function(response){
          let state = response.getState();
          if (state === "SUCCESS"){
              let photos = response.getReturnValue();
              component.set("v.photos", photos);
              this.getMainPhotoUrl(component, recordId, photos);
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
    getMainPhotoUrl: function(component, recordId, photos){
        let action = component.get("c.getMainPhotoUrl");
        action.setParams({
             id : recordId
        });
        action.setCallback(this, function(response){
             let state = response.getState();
             if (state === "SUCCESS"){
                  let url = response.getReturnValue();
                  component.set("v.mainPhotoUrl", url);
                  this.checkIsMainPhoto(component, photos, url);
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
    checkIsMainPhoto: function(component, photos, mainPhotoUrl){
        let index;
        for(let i = 0; i < photos.length; i++){
            if(photos[i].ImgUrl__c === mainPhotoUrl){
                index = i;
                component.set("v.mainPhotoIndex", index);
            }
        }
        this.setClass(component, index);
    },
    setClass: function(component, index){
        let photos = component.find("productImg");
        for(let i = 0; i < photos.length; i++){
            let itemId = photos[i].getElement().getAttribute("data-id");
            if(itemId != index){
                $A.util.removeClass(photos[i], "chosenPhoto");
            }
            else{
                $A.util.addClass(photos[i], "chosenPhoto");
            }
        }
    },
    setPhoto: function(component, event){
        let index = event.currentTarget.dataset.id;
        let photos = component.get("v.photos");
        let mainPhoto = photos[index];
        let url = mainPhoto.ImgUrl__c;
        let recordId = component.get("v.recordId");
        let action = component.get("c.setMainPhoto");
        action.setParams({
            url : url,
            productId : recordId
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
                 this.setClass(component, index);
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