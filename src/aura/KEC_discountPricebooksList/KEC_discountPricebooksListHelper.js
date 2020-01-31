/**
 * Created by BRITENET on 28.01.2020.
 */
({
    setPricebookId: function(component, event){
        let index = event.currentTarget.id;
        component.set("v.index", index);
    },
    openNewPriceBookModal: function(component){
        let isNew = true;
        component.set("v.isNew", isNew);
        component.set("v.openModal", true);
        this.setValues(component, isNew);
    },
    setValues: function(component, isNew){
        if(isNew){
             component.set("v.pricebookName", '');
             component.set("v.productName", '');
             let selectedType = $A.get('$Label.c.KEC_Percent');
             component.set("v.selectedType", selectedType);
             component.set("v.startDate", null);
             component.set("v.endDate", null);
             let selectedItems = [];
             component.set("v.selectedItems", selectedItems);
             let searchResults = [];
             component.set("v.searchResults", searchResults);
             component.set("v.discountValue", 0);
        }
        else {
             let pricebook = component.get("v.pricebook");
             component.set("v.pricebookName", pricebook.Name);
             component.set("v.productName", '');
             component.set("v.selectedType", pricebook.DiscountType__c);
             component.set("v.startDate", pricebook.StartDate__c);
             component.set("v.endDate", pricebook.EndDate__c);
             let searchResults = [];
             component.set("v.searchResults", searchResults);
             let selectedItems = component.get("v.productPriceWrappers");
             component.set("v.selectedItems", selectedItems);
             component.set("v.discountValue", pricebook.Value__c);
        }
    }
})