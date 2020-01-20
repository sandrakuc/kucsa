/**
 * Created by BRITENET on 17.01.2020.
 */
({
    getOrderIndex: function(component, event){
        let orderId = event.currentTarget.id;
        component.set("v.index", orderId);
    },
    redirectToCaseListPage: function(component, event){
        let index = event.currentTarget.id;
        let orders = component.get("v.orders");
        let orderId = orders[index].Id;
        let urlAddress = '/ordercases?recordId='+orderId;
        component.find("redirectCmp").redirectToSite(urlAddress);
    }
})