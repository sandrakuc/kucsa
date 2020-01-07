
({
    onInit: function(component, event, helper){
        helper.prepareValues(component, event, helper);
    },
    handleColorChange: function(component, event, helper){
        helper.handleColor(component, event, helper);
    },
    handleSizeChange: function(component, event, helper){
        helper.handleSize(component, event, helper);
    },
    onFilters: function(component, event, helper){
        helper.applyFilters(component, event, helper);
    }
})