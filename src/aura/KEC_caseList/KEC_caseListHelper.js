/**
 * Created by BRITENET on 21.01.2020.
 */
({
    getCaseIndex: function(component, event){
        let caseId = event.currentTarget.id;
        component.set("v.index", caseId);
    }
})