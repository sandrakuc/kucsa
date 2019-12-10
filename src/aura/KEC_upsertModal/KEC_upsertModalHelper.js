
({
    closeEdit: function(component){
        component.set("v.editIsOpen", false);
    },
    handleSuccess: function(component, event, helper){
        component.set("v.operationSuccess", true);
        var compEvent = component.getEvent("resultListChange");
        compEvent.setParams({"changeFlag" : true ,
            "newAccountId" : component.get("v.newAccountId"),
            "newAccountName" : component.get("v.newAccountName"),
            "newAccountStreet" : component.get("v.newAccountStreet"),
            "newAccountCity" : component.get("v.newAccountCity"),
            "newAccountPostalCode" : component.get("v.newAccountPostalCode"),
            "newAccountState" : component.get("v.newAccountState"),
            "newAccountCountry" : component.get("v.newAccountCountry"),
            isNew : component.get("v.isNew")});
        compEvent.fire();
    },
    handleSubmit: function(component, event, helper){
        var fields = event.getParam("fields"),
            account = component.get("v.account");
            if(account != null){
                component.set("v.newAccountId", account.Id);
            }
            component.set("v.newAccountName", fields["Name"]);
            component.set("v.newAccountStreet", fields["ShippingStreet"]);
            component.set("v.newAccountCity", fields["ShippingCity"]);
            component.set("v.newAccountCountry", fields["ShippingCountry"]);
            component.set("v.newAccountState", fields["ShippingState"]);
            component.set("v.newAccountPostalCode", fields["ShippingPostalCode"]);
    }
})