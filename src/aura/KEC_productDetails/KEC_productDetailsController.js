/**
 * Created by BRITENET on 08.01.2020.
 */
({
    onInit: function(component, event, helper){
        helper.prepareProductView(component);
    },
    handleColorChange: function(component, event, helper){
        helper.handleColor(component, event);
    },
    handleSizeChange: function(component, event, helper){
        helper.handleSize(component, event);
    },
    selectPhoto: function(component, event, helper){
        helper.getPhoto(component, event);
    },
    addToFavorites: function(component, event, helper){
        helper.favorites(component);
    },
    openModal: function(component, event, helper){
        helper.open(component, event, helper);
    },
    handleSaveOpinion: function(component, event, helper){
        helper.saveUserOpinion(component, event, helper);
    }
})