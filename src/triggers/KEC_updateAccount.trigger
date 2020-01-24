/**
 * Created by BRITENET on 23.01.2020.
 */

trigger KEC_updateAccount on Account (after update) {
    if(Trigger.new.size() == 1){
        KEC_AccountUpdateTriggerHelper.createLoyaltyCoupon(Trigger.new[0]);
    }
}