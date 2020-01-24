/**
 * Created by BRITENET on 23.01.2020.
 */

public with sharing class KEC_AccountUpdateTriggerHelper {

    private static Integer getDiscount(Integer points) {
        return (points / 1000) * 10 > 50 ? 50 : (points / 1000) * 10;
    }

    private static Boolean alreadyHasCoupon(Integer discount, Account account) {
        List<KEC_Loyalty_Coupon__c> loyaltyCoupons = [
                SELECT Id
                FROM KEC_Loyalty_Coupon__c
                WHERE (Discount__c = :discount AND Account__c = :account.Id AND LoyaltyCycle__c = :account.LoyaltyCycle__c)
                OR (Discount__c >= :discount AND Account__c = :account.Id AND IsValid__c = TRUE)
        ];
        return loyaltyCoupons.size() > 0;
    }

    private static KEC_Loyalty_Coupon__c hasCouponWithSmallerDiscount(Integer discount, Account account) {
        List<KEC_Loyalty_Coupon__c> loyaltyCoupons = [
                SELECT Id, IsUsed__c
                FROM KEC_Loyalty_Coupon__c
                WHERE Discount__c < :discount AND Account__c = :account.Id AND IsValid__c = TRUE
        ];
        if(loyaltyCoupons.size() > 1){
            CalloutException e = new CalloutException();
            e.setMessage('Invalid number of valid coupons!');
            throw e;
        }
        else if(loyaltyCoupons.isEmpty()){
            return null;
        }
        else{
            return loyaltyCoupons[0];
        }
    }

    private static String generateDiscountCode(){
        String code = '';
        for(Integer i = 0; i < 16; i++){
            code += Integer.valueOf(Math.Random() * 9);
        }
        return code;
    }

    private static KEC_Loyalty_Coupon__c buildLoyaltyCoupon(Integer discount, Account account){
        KEC_Loyalty_Coupon__c loyaltyCoupon = new KEC_Loyalty_Coupon__c(Account__c = account.Id, Code__c = generateDiscountCode(), Discount__c = discount, EndDate__c = Date.today().addMonths(3), IsUsed__c = false, LoyaltyCycle__c = account.LoyaltyCycle__c);
        return loyaltyCoupon;
    }

    private static void sendEmail(KEC_Loyalty_Coupon__c coupon){
        EmailTemplate emailTemplate = [SELECT Id, Subject, HtmlValue FROM EmailTemplate WHERE DeveloperName ='Loyalty_Coupon_Create'];
        List<string> toAddress = new List<string>();
        toAddress.add(UserInfo.getUserEmail());
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setTemplateId(emailTemplate.Id);
        mail.setToAddresses(toAddress);
        List<Contact> contacts = KEC_Utils.getContactByAccount(coupon.Account__c);
        mail.setTargetObjectId(contacts[0].Id);
        mail.setWhatId(coupon.Id);
        mail.setSaveAsActivity(false);
        mail.setUseSignature(false);
        List<Messaging.SingleEmailMessage> messages = new List<Messaging.SingleEmailMessage>();
        messages.add(mail);
        Messaging.sendEmail(messages, false);
    }

    public static void createLoyaltyCoupon(Account account){
        Integer discount = getDiscount((Integer) account.LoyaltyPoints__c);
        if(!alreadyHasCoupon(discount, account) && discount > 0){
            List<KEC_Loyalty_Coupon__c> loyaltyCoupons = new List<KEC_Loyalty_Coupon__c>();
            KEC_Loyalty_Coupon__c loyaltyCoupon = buildLoyaltyCoupon(discount, account);
            loyaltyCoupons.add(loyaltyCoupon);
            KEC_Loyalty_Coupon__c olderCoupon = hasCouponWithSmallerDiscount(discount, account);
            if(olderCoupon != null){
                olderCoupon.IsUsed__c = TRUE;
                loyaltyCoupons.add(olderCoupon);
            }
            Database.upsert(loyaltyCoupons);
            sendEmail(loyaltyCoupon);
        }
    }
}