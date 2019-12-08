
public with sharing class KEC_DivisionSearchController {

    private static String getQuery(String name, String city, String country){
        String query = 'SELECT Id, Name, ShippingCountry, ShippingCity, ShippingStreet, ShippingPostalCode FROM Account WHERE Name LIKE \'%' + name + '%\'';
        query += String.isBlank(country) ? '' : ' AND ShippingCountry LIKE \'%' + country + '%\'';
        query += String.isBlank(city) ? '' : ' AND ShippingCity LIKE \'%' + city + '%\'';
        return query;
    }

    @AuraEnabled
    public static List<Account> getSearchResults(String name, String city, String country){
        return Database.query(getQuery(name, city, country));
    }

    @AuraEnabled
    public static Boolean deleteDivision(String id){
        Database.DeleteResult result = Database.delete(id);
        return result.isSuccess();
    }

    @AuraEnabled
    public static Boolean upsertDivision(String id, String name, String shippingCountry, String shippingCity, String shippingStreet, String shippingPostalCode, String shippingState){
        Account account = new Account(Id=id, Name = name, ShippingCountry = shippingCountry, ShippingCity = shippingCity, ShippingStreet = shippingStreet, ShippingPostalCode = shippingPostalCode, ShippingState = shippingState);
        Database.UpsertResult result = Database.upsert(account);
        return result.isSuccess();
    }

}