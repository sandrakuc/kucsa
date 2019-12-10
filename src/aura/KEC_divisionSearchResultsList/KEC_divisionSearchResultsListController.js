
({
    setDivisionId: function(component, event, helper){
        var divisionId = event.currentTarget.dataset.id;
        component.set("v.index", divisionId);
        helper.setClass(component, divisionId);
    },
    getState: function(component, event, helper){
        var divisionId = component.get("v.divisionId"),
            listResult = component.get("v.resultList"),
            index;
        for(let i = 0; i < listResult.length; i++){
            if(listResult[i].Id === divisionId){
                index = i;
            }
        }
        helper.setClass(component, index);
    }
})