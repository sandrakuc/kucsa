
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
    setSelectedRecord: function(component, event, helper){
        helper.selectRecord(component, event, helper);
    },
    deleteRecord: function(component, event, helper){
        helper.onDelete(component, event, helper);
    },
    handleComponentEvent: function(component, event, helper){
        helper.handleEvent(component, event, helper);
    }

})