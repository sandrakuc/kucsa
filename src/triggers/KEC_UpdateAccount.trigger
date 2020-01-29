/**
 * Created by BRITENET on 29.01.2020.
 */

trigger KEC_UpdateAccount on Account (after insert, after update) {
    if(Trigger.new.size() == 1){
        KEC_AccountUpdateTriggerHelper.createLoyaltyCoupon(Trigger.new[0]);
    }
}