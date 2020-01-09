/**
 * Created by BRITENET on 08.01.2020.
 */
({
    onInit: function(component, event, helper){
        helper.prepareProductView(component, event, helper);
    },
    handleColorChange: function(component, event, helper){
        helper.handleColor(component, event, helper);
    },
    handleSizeChange: function(component, event, helper){
        helper.handleSize(component, event, helper);
    },
    selectPhoto: function(component, event, helper){
        helper.getPhoto(component, event, helper);
    }
})