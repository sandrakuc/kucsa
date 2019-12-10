
({
    setDivisionId: function(component, event, helper){
        var divisionId = event.currentTarget.dataset.id;
        component.set("v.index", divisionId);
        var arr = component.find("resultItem");
        for(let i = 0; i < arr.length; i++){
            var itemId = arr[i].getElement().getAttribute("data-id");
            if(itemId !== divisionId){
                $A.util.removeClass(arr[i], "selectedRow");
            }else {
                $A.util.addClass(arr[i], "selectedRow");
            }
        }
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
        console.log(index);
        var arr = component.find("resultItem");
        for(let i = 0; i < arr.length; i++){
             var itemId = arr[i].getElement().getAttribute("data-id");
             if(itemId != index){
                  $A.util.removeClass(arr[i], "selectedRow");
             }else {
                 $A.util.addClass(arr[i], "selectedRow");
             }
        }
    }
})