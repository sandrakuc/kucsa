/**
 * Created by BRITENET on 17.01.2020.
 */
({
    getOrderIndex: function(component, event){
        let orderId = event.currentTarget.id;
        component.set("v.index", orderId);
    }
})