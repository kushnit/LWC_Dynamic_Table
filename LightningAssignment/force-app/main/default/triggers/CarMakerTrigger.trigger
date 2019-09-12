trigger CarMakerTrigger on Car_Maker__c (after insert) {
    Car_Maker__c car = trigger.new[0];
    Map<String, Object> carFields = new Map<String, Object>();
    Map<String, Schema.SObjectField> fieldMap = Schema.SObjectType.Car_Maker__c.fields.getMap();

    for (String str : fieldMap.keyset())
    {
        carFields.put(str, car.get(str));
    } 

    String serializedFieldValues = JSON.serialize(carFields);

    //publish event 
    Car_Insert__e notify = new Car_Insert__e(Message__c=serializedFieldValues); 
    Database.SaveResult result = EventBus.publish(notify);
    // Inspect publishing results
    
    if (!result.isSuccess()) {
        for (Database.Error error : result.getErrors()) {
            System.debug('Error returned: ' + error.getStatusCode() +' - '+ error.getMessage());
        }
    }
}