/**
 * Created by BRITENET on 28.01.2020.
 */
({
    setPricebookId: function(component, event){
        let index = event.currentTarget.dataset.id;
        component.set("v.index", index);
    }
})