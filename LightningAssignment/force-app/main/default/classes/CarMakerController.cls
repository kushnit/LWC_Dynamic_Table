public with sharing class CarMakerController {
    
    @AuraEnabled(cacheable=true)
    public static List<Car_Maker__c> getCarMakerList(){
        return [SELECT id, Name, Founded__c, Founder__c, Number_of_employees__c, Website__c FROM Car_Maker__c ORDER BY CreatedDate DESC LIMIT 10];       
    }

    @AuraEnabled(cacheable=true)
    public static List<Model__c> getCarModelList(id makerId){
        return [SELECT id, Name, Class__c, Horsepower__c, MPG__c, Price__c FROM Model__c WHERE Maker__c =: makerId LIMIT 10];
    }
}