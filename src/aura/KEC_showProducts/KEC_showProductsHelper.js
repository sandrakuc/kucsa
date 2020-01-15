/**
 * Created by BRITENET on 15.01.2020.
 */
({
    redirectToViewPage: function(component, event){
        let index = event.currentTarget.dataset.id;
        console.log(index);
        let products = component.get("v.resultList");
        let productId = products[index].Id;
        let urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
             "url": '/productview?recordId='+productId
        });
        urlEvent.fire();
    }
})