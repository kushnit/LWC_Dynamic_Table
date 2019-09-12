import { LightningElement, track} from 'lwc';
import CARMAKER_OBJECT from '@salesforce/schema/Car_Maker__c';
import NAME_FIELD from '@salesforce/schema/Car_Maker__c.Name';
import WEBSITE_FIELD from '@salesforce/schema/Car_Maker__c.Website__c';

export default class RecordForm extends LightningElement {
    carMakerObject = CARMAKER_OBJECT;
    carMakerFields = [NAME_FIELD, WEBSITE_FIELD];
    nameField = NAME_FIELD;
    websiteField = WEBSITE_FIELD;

    /** Status message when creating an Car Maker. */
    @track createStatus = '';

    /** Handles successful Car Maker creation. */
    handleCarMakerCreated(evt){
        this.createStatus = `Car Maker record created. Id is ${evt.detail.id}`;

        const event = new CustomEvent('newrecord', {
            detail: {data: evt.detail},
        });
        this.dispatchEvent(event);
    }
}