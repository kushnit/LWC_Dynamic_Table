import { LightningElement, track, wire, api } from 'lwc';
import getCarModelList from '@salesforce/apex/CarMakerController.getCarModelList'

const modelCol = [
    {label: 'Name', fieldName: 'Name'},
    {label: 'Class', fieldName: 'Class__c'},
    {label: 'Price', fieldName: 'Price__c', type: 'currency'}
];

export default class CarModels extends LightningElement {
    @api makerId;
    @track modelColumns = modelCol;
    @track carModels;
    @track areModels = false;

    @wire(getCarModelList,{makerId:'$makerId'})
    wireCarModels(result){
        if(result.data){
            console.log(JSON.stringify(result));
            console.log(JSON.stringify(result.data));
            this.carModels = result.data;
            if(this.carModels.length > 0)
                this.areModels = true;
        }
        else if(result.error){
            console.log('This is the Error : ' + result.error);
        }
    }
    
}