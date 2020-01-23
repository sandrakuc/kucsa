/**
 * Created by BRITENET on 22.01.2020.
 */
({
    onInit: function(component, event, helper){
        helper.getPhotos(component);
    },
    setNewMainPhoto: function(component, event, helper){
        helper.setPhoto(component, event);
    }
})