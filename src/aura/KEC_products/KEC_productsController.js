/**
 * Created by BRITENET on 06.01.2020.
 */
({
    onSearch: function(component, event,helper){
        helper.search(component);
    },
    onFilter: function(component, event, helper){
        helper.filter(component, event);
    }
})