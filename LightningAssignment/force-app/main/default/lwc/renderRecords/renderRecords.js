import { LightningElement, api, wire } from 'lwc';
/* Wire adapter to fetch record data */
import {getRecord, getFieldValue} from 'lightning/uiRecordApi';
import CARMAKER_OBJECT from '@salesforce/schema/Car_Maker__c';
import NAME_FIELD from '@salesforce/schema/Car_Maker__c.Name';

export default class RenderRecords extends LightningElement {
    //* id of the record to display */
    @api recordId;

    /* Expose schema objects/fields to the template. */
    carMakerObject = CARMAKER_OBJECT;

    /* Load carMaker.Name for custom rendering */
    @wire(getRecord,{recordId: '$recordId', fields: [NAME_FIELD]})
    record;

    /** Gets the Car_Maker__c.Name value. */
    get nameValue(){
        return this.record.data ? getFieldValue(this.record.data, NAME_FIELD) : '';
    }
}