
({
    setClass: function(component, divisionId){
        var arr = component.find("resultItem");
        for(let i = 0; i < arr.length; i++){
            var itemId = arr[i].getElement().getAttribute("data-id");
            if(itemId != divisionId){
                $A.util.removeClass(arr[i], "selectedRow");
            }else {
                $A.util.addClass(arr[i], "selectedRow");
            }
         }
    }
})