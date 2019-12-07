
({
    onSearch: function (component, event, helper){
        helper.search(component);
    },
    displayDetails: function(component, event, helper){
        helper.display(component, event);
    },
    clear: function(component, event, helper){
        component.set('v.searchItemName', '');
        component.set('v.searchItemCountry', '');
        component.set('v.searchItemCity', '');
    },
    setSelectedRecord: function(component, event, handler){
        let index = component.get("v.index"),
            listResult = component.get("v.resultList");
        component.set("v.selectedRecord", listResult[index]);
        let detail = [];
        detail.push(listResult[index]);
        component.set("v.mapPointers", detail);
    },
    deleteRecord: function(component, event, helper){
        helper.onDelete(component, event, helper);
    },
    handleComponentEvent: function(component, event, helper){
        let changeFlag = event.getParam("changeFlag");
        if(changeFlag){
            helper.search(component);
        }
    }

})