/**
 * Created by BRITENET on 02.02.2020.
 */

global class KEC_UpdateProductsBestPriceScheduler implements Schedulable{

    global void execute(SchedulableContext schedulableContext){
        KEC_UpdateProductsBestPriceBatch batch = new KEC_UpdateProductsBestPriceBatch();
        Database.executeBatch(batch, 200);
    }

}