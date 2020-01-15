
({
    onInit: function(component, event, helper){
        helper.prepareValues(component);
    },
    handleColorChange: function(component, event, helper){
        helper.handleColor(component, event);
    },
    handleSizeChange: function(component, event, helper){
        helper.handleSize(component, event);
    },
    onFilters: function(component, event, helper){
        helper.applyFilters(component);
    }
})