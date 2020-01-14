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
    },
    addToFavorites: function(component, event, helper){
        helper.favorites(component, event, helper);
    },
    openModal: function(component, event, helper){
        helper.open(component, event, helper);
    },
    handleSaveOpinion: function(component, event, helper){
        helper.saveUserOpinion(component, event, helper);
    },
    toCart: function(component, event, helper){
        helper.addToCart(component, event, helper);
    }
})