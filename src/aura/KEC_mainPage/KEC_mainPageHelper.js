/**
 * Created by BRITENET on 02.02.2020.
 */
({
    loadPhoto: function(component){
        let url = $A.get('$Resource.imageback');
        component.set('v.backgroundImageURL', url);
    }
})