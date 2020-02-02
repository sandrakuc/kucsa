/**
 * Created by BRITENET on 29.01.2020.
 */
({
    close: function(component){
         component.set("v.openModal", false);
    },
    prepareTypes: function(component){
         let types = $A.get('$Label.c.KEC_DiscountTypeOptions').split(",");
         let availableTypes = [];
         for(let i = 0; i < types.length; i++){
             let type = { 'label' : types[i], 'type' : types[i] };
             availableTypes.push(type);
         }
         component.set("v.typeOptions", availableTypes);
    },
    handleType: function(component, event){
        let selectedType = event.getSource().get("v.value");
        component.set("v.selectedType", selectedType);
        let searchResults = component.get("v.searchResults");
        if(searchResults != null && searchResults.length != 0){
            this.updateSpecialDiscountsAfterChangingTypeOrValue(component, selectedType);
        }
    },
    setPercentDiscountForAllProducts: function(component){
        let discountValue = component.get("v.discountValue");
        let searchResults = component.get("v.searchResults");
        let selectedItems = component.get("v.selectedItems");
        for(let i = 0; i < searchResults.length; i++){
            searchResults[i].discountPrice = searchResults[i].standardPrice - (searchResults[i].standardPrice * discountValue)/100;
        }
        for(let i = 0; i < selectedItems.length; i++){
             selectedItems[i].discountPrice = selectedItems[i].standardPrice - (selectedItems[i].standardPrice * discountValue)/100;
        }
        component.set("v.searchResults", searchResults);
        component.set("v.selectedItems", selectedItems);
    },
    setAmountDiscountForAllProducts: function(component){
        let discountValue = component.get("v.discountValue");
        let searchResults = component.get("v.searchResults");
        let selectedItems = component.get("v.selectedItems");
        for(let i = 0; i < searchResults.length; i++){
             searchResults[i].discountPrice = searchResults[i].standardPrice - discountValue;
        }
        for(let i = 0; i < selectedItems.length; i++){
             selectedItems[i].discountPrice = selectedItems[i].standardPrice - discountValue;
        }
        component.set("v.searchResults", searchResults);
        component.set("v.selectedItems", selectedItems);
    },
    discountValueChangeHandler: function(component){
        let discountType = component.get("v.selectedType") == null ? component.get("v.typeOptions")[0].label : component.get("v.selectedType");
        let searchResults = component.get("v.searchResults");
        if(searchResults != null && searchResults.length != 0){
            if(discountType === component.get("v.typeOptions")[0].label){
                this.setPercentDiscountForAllProducts(component);
            }
            else{
                this.setAmountDiscountForAllProducts(component);
            }
            this.updateSpecialDiscountsAfterChangingTypeOrValue(component, discountType);
        }
    },
    setSpecialPercentDiscountForProduct: function(component, event){
        let index = event.currentTarget.id;
        let discountValue = document.getElementById(index).value;
        if(discountValue == ''){
             discountValue = component.get("v.discountValue");
        }
        let searchResults = component.get("v.searchResults");
        for(let i = 0; i < searchResults.length; i++){
            if(searchResults[i].productId === index){
                searchResults[i].discountPrice = searchResults[i].standardPrice - (searchResults[i].standardPrice * discountValue)/100;
                searchResults[i].specialDiscount = discountValue === component.get("v.discountValue") ? '' : discountValue;
            }
        }
        let selectedItems = component.get("v.selectedItems");
        for(let i = 0; i < selectedItems.length; i++){
             if(selectedItems[i].productId === index){
                   selectedItems[i].discountPrice = selectedItems[i].standardPrice - (selectedItems[i].standardPrice * discountValue)/100;
             }
        }
        component.set("v.searchResults", searchResults);
        component.set("v.selectedItems", selectedItems);
    },
    setSpecialAmountDiscountForProduct: function(component, event){
        let index = event.currentTarget.id;
        let discountValue = document.getElementById(index).value;
        if(discountValue == ''){
             discountValue = component.get("v.discountValue");
        }
        let searchResults = component.get("v.searchResults");
         for(let i = 0; i < searchResults.length; i++){
              if(searchResults[i].productId === index){
                   searchResults[i].discountPrice = searchResults[i].standardPrice - discountValue;
                   searchResults[i].specialDiscount = discountValue === component.get("v.discountValue") ? '' : discountValue;
              }
         }
         let selectedItems = component.get("v.selectedItems");
         for(let i = 0; i < selectedItems.length; i++){
             if(selectedItems[i].productId === index){
                 selectedItems[i].discountPrice = selectedItems[i].standardPrice - discountValue;
             }
         }
        component.set("v.searchResults", searchResults);
        component.set("v.selectedItems", selectedItems);
    },
    setSpecialDiscount: function(component, event){
        let discountType = component.get("v.selectedType") == null ? component.get("v.typeOptions")[0].label : component.get("v.selectedType");
        if(discountType === component.get("v.typeOptions")[0].label){
             this.setSpecialPercentDiscountForProduct(component, event);
        }
        else{
             this.setSpecialAmountDiscountForProduct(component, event);
        }
    },
    updateSpecialDiscountsAfterChangingTypeOrValue: function(component, discountType){
        let searchResults = component.get("v.searchResults");
        for(let i = 0; i < searchResults.length; i++){
            let discountValue = document.getElementById(searchResults[i].productId).value;
            if(discountValue == ''){
                discountValue = component.get("v.discountValue");
            }
            if(discountType === component.get("v.typeOptions")[0].label){
                searchResults[i].discountPrice = searchResults[i].standardPrice - (searchResults[i].standardPrice * discountValue)/100;
            }
            if(discountType === component.get("v.typeOptions")[1].label){
                searchResults[i].discountPrice = searchResults[i].standardPrice - discountValue;
            }
        }
        let selectedItems = component.get("v.selectedItems");
        for(let i = 0; i < selectedItems.length; i++){
            let discountValue = document.getElementById(selectedItems[i].productId).value;
            if(discountValue == ''){
                 discountValue = component.get("v.discountValue");
            }
            if(discountType === component.get("v.typeOptions")[0].label){
                 selectedItems[i].discountPrice = selectedItems[i].standardPrice - (selectedItems[i].standardPrice * discountValue)/100;
            }
            if(discountType === component.get("v.typeOptions")[1].label){
                 selectedItems[i].discountPrice = selectedItems[i].standardPrice - discountValue;
            }
        }
        component.set("v.searchResults", searchResults);
        component.set("v.selectedItems", selectedItems);
    },
    handleProducts: function(component, event){
        let searchResults = component.get("v.searchResults"),
            selectedItems = component.get("v.selectedItems"),
            index = event.getSource().get("v.value");
        console.log(index);
        console.log(JSON.stringify(searchResults[index]));
        if(event.getSource().get("v.checked")){
            selectedItems.push(searchResults[index]);
        }
        else{
            for(let i = 0; i<selectedItems.length; i++){
                if(selectedItems[i].productId === searchResults[index].productId){
                    selectedItems.splice(i, 1);
                }
            }
        }
        console.log(JSON.stringify(selectedItems));
        component.set("v.selectedItems", selectedItems);
    }
})