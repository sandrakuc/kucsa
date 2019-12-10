
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
        },
        handleEvent: function(component, event, helper){
            let changeFlag = event.getParam("changeFlag");
            if(changeFlag){
                if(event.getParam("isNew")){
                    component.set("v.selectedRecord", null);
                    this.search(component);
                }else{
                    var resultList = component.get("v.resultList");
                    for(let i = 0; i<resultList.length; i++){
                        if(resultList[i].Id == event.getParam("newAccountId")){
                            resultList[i].Id = event.getParam("newAccountId");
                            resultList[i].Name = event.getParam("newAccountName");
                            resultList[i].ShippingStreet = event.getParam("newAccountStreet");
                            resultList[i].ShippingCity = event.getParam("newAccountCity");
                            resultList[i].ShippingCountry = event.getParam("newAccountCountry");
                            resultList[i].ShippingState = event.getParam("newAccountState");
                            resultList[i].ShippingPostalCode = event.getParam("newAccountPostalCode");
                            component.set("v.resultList", resultList);
                        }
                    }
                }
                 if(event.getParam("newAccountId") != null){
                     component.set("v.divisionId", event.getParam("newAccountId"));
                     let selected = component.get("v.selectedRecord");
                     let detail = [];
                     detail.push(selected);
                     component.set("v.mapPointers", detail);
                 }
            }
        },
        selectRecord: function(component, event, helper){
            let index = component.get("v.index"),
                        listResult = component.get("v.resultList");
            component.set("v.selectedRecord", listResult[index]);
            let detail = [];
            detail.push(listResult[index]);
            component.set("v.mapPointers", detail);
        }
  })