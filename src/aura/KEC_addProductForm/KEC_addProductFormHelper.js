/**
 * Created by BRITENET on 21.01.2020.
 */
({
    prepareValues : function(component){
         let colorOptionsNames = $A.get("$Label.c.KEC_colors").split(",");
         let sizeOptionsNames = $A.get("$Label.c.KEC_sizes").split(",");
         let colorOptions = [];
         let sizeOptions = [];
            for(let i = 0; i < colorOptionsNames.length; i++){
                let option = { 'label' : colorOptionsNames[i], 'colors' : colorOptionsNames[i] };
                colorOptions.push(option);
            }
            for(let i = 0; i < sizeOptionsNames.length; i++){
                let option = { 'label' : sizeOptionsNames[i], 'sizes' : sizeOptionsNames[i] };
                sizeOptions.push(option);
         }
         component.set("v.colorOptions", colorOptions);
         component.set("v.sizeOptions", sizeOptions);
         let userId = $A.get("$SObjectType.CurrentUser.Id");
         component.set("v.userId", userId);
    },
     handleColor: function(component, event){
         let selectedColors = component.get("v.selectedColors");
         let colors = event.getSource().get("v.value");
         if(event.getSource().get("v.checked")){
             selectedColors.push(colors);
         }
         else{
                selectedColors.splice(colors, 1);
         }
         component.set("v.selectedColors", selectedColors);
     },
     handleSize: function(component, event){
         let selectedSizes = component.get("v.selectedSizes");
         let sizes = event.getSource().get("v.value");
         if(event.getSource().get("v.checked")){
             selectedSizes.push(sizes);
         }
         else{
             selectedSizes.splice(sizes, 1);
         }
         component.set("v.selectedSizes", selectedSizes);
     },
     getPhotos: function(component, event){
         let files = event.getParam("files");
         let fileIds = [];
         for(let i = 0; i < files.length; i++){
             let fileName = files[i].name.split(".");
             if(fileName[fileName.length - 1] != 'jpg' && fileName[fileName.length - 1] != 'jpeg' && fileName[fileName.length - 1] != 'png'){
                 component.find("toastCmp").toast($A.get("$Label.c.KEC_Error"), "error", $A.get("$Label.c.KEC_FileTypeNotSupported"));
             }
             else{
                 fileIds.push(files[i].documentId);
             }
         }
         component.set("v.fileIds", fileIds);
     },
     saveNewProduct: function(component){
         let productName = component.get("v.productName"),
            standardPrice = component.get("v.standardPrice"),
            availableSizes = component.get("v.selectedSizes"),
            availableColors = component.get("v.selectedColors"),
            description = component.get("v.description"),
            fileIds = component.get("v.fileIds");
         let action = component.get("c.addProduct");
         action.setParams({
             productName : productName,
             standardPrice : standardPrice,
             availableSizes : availableSizes,
             availableColors : availableColors,
             description : description,
             fileIds : fileIds
         })
         action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS"){
                 let operationResult = response.getReturnValue(),
                    title = operationResult.isSuccess ? $A.get("$Label.c.KEC_Success") : $A.get("$Label.c.KEC_Error"),
                    type = operationResult.isSuccess ? "success" : "error",
                     message = operationResult.message;
                 component.find("toastCmp").toast(title, type, message);
                 component.set("v.openModal", false);
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