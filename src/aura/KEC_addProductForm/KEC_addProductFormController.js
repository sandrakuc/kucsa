/**
 * Created by BRITENET on 21.01.2020.
 */
({
    onInit: function(component, event, helper){
        helper.prepareValues(component);
    },
    handleColorChange: function(component, event, helper){
        helper.handleColor(component, event);
    },
    handleSizeChange: function(component, event, helper){
        helper.handleSize(component, event);
    },
    handleUpload: function(component, event, helper){
        helper.getPhotos(component, event);
    },
    onSaveProduct: function(component, event, helper){
        helper.saveNewProduct(component);
    }
})