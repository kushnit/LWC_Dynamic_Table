trigger PlatformEventForUpdate on Account (after update) {

    Account newAcc = trigger.new[0];
    Account oldAcc = trigger.old[0];
    Account acc = new Account(); 
    Map<String, Object> changedFields = new Map<String, Object>();
    //Schema.SObjectType objType = LeadObject.getSObjectType();
    Map<String, Schema.SObjectField> fieldMap = Schema.SObjectType.Account.fields.getMap();
    for (String str : fieldMap.keyset())
    {
        try
        {
            System.debug('Field name: '+str +'. New value: ' + newAcc.get(str) +'. Old value: '+oldAcc.get(str));
            if(newAcc.get(str) != oldAcc.get(str))
            {
                system.debug('******The value has changed!!!! '); 
                changedFields.put(str, newAcc.get(str));
            }
        }
        catch (Exception e)
        {
            System.debug('Error: ' + e);
        }
    } 
    String serializedFieldValues = JSON.serialize(changedFields);
    
    //publish event 
    Notification__e notify = new Notification__e(Message__c=serializedFieldValues); 
    Database.SaveResult result = EventBus.publish(notify);
    // Inspect publishing results
    
    if (!result.isSuccess()) {
        for (Database.Error error : result.getErrors()) {
            System.debug('Error returned: ' + error.getStatusCode() +' - '+ error.getMessage());
        }
    }
    
    
}