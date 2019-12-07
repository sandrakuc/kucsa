
({
    search: function(component){
        let action = component.get("c.getSearchResults");
        action.setParams({
            name : component.get("v.searchItemName"),
            city: component.get("v.searchItemCity"),
            country: component.get("v.searchItemCountry")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS"){
                component.set("v.resultList", response.getReturnValue());
                component.set("v.mapPointers", response.getReturnValue());
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    onDelete: function(component, event, helper){
        var action = component.get("c.deleteDivision"),
            account = component.get("v.selectedRecord");
            action.setParams({
                id: account.Id
            });
            let isSuccess;
            action.setCallback(this, function(response){
                let state = response.getState();
                component.set("v.deleteIsOpen", false);
                component.set("v.selectedRecord", null);
                if(state === "SUCCESS"){
                    component.set("v.operationSuccess", true);
                    component.set("v.operationFailed", false);
                } else {
                    component.set("v.operationFailed", true);
                    component.set("v.operationSuccess", false);
                }
            });
            $A.enqueueAction(action);
            this.search(component);
        }
  })