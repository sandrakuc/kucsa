/**
 * Created by BRITENET on 07.01.2020.
 */
({
    prepareValues : function(component){
        let colorOptionsNames = $A.get("$Label.c.KEC_colors").split(",");
        let sizeOptionsNames = $A.get("$Label.c.KEC_sizes").split(",");
        let colorOptions = [];
        let sizeOptions = [];
        for(let i = 0; i < colorOptionsNames.length; i++){
            let option = { 'label' : colorOptionsNames[i], 'colors' : colorOptionsNames[i] };
            colorOptions.push(option);
        }
        for(let i = 0; i < sizeOptionsNames.length; i++){
            let option = { 'label' : sizeOptionsNames[i], 'sizes' : sizeOptionsNames[i] };
            sizeOptions.push(option);
        }
        component.set("v.colorsOptions", colorOptions);
        component.set("v.sizesOptions", sizeOptions);
    },
    handleColor: function(component, event){
        let selectedColors = component.get("v.selectedColors");
        let colors = event.getSource().get("v.value");
        if(event.getSource().get("v.checked")){
            selectedColors.push(colors);
        }
        else {
            selectedColors.splice(colors, 1);
        }
        component.set("v.selectedColors", selectedColors);
    },
    handleSize: function(component, event){
        let selectedSizes = component.get("v.selectedSizes");
        let sizes = event.getSource().get("v.value");
        if(event.getSource().get("v.checked")){
            selectedSizes.push(sizes);
        }
        else {
            selectedSizes.splice(sizes, 1);
        }
        component.set("v.selectedSizes", selectedSizes);
    },
    applyFilters: function(component){
        let appEvent = $A.get("e.c:KEC_filterApplied");
        appEvent.setParams({
            "maxPrice" : component.get("v.maxPrice"),
            "colors" : component.get("v.selectedColors"),
            "sizes" : component.get("v.selectedSizes")
        });
        appEvent.fire();
    }
})