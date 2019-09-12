import { LightningElement, wire, track, api } from 'lwc';
import { subscribe, unsubscribe, onError, setDebugFlag, isEmpEnabled } from 'lightning/empApi';
import getCarMakerList from '@salesforce/apex/CarMakerController.getCarMakerList'

const col = [
    {label: 'Name', fieldName: 'Name'},
    {label: 'Founded', fieldName: 'Founded__c', type: 'date'},
    {label: 'Founder', fieldName: 'Founder__c'},
    {label: 'Number of Employees', fieldName: 'Number_of_employees__c', type: 'number'},
    {label: 'Website', fieldName: 'Website__c', type: 'url'},
    {label: 'Details', type: 'button-icon', initialWidth: 75,
        typeAttributes: {
            iconName: 'action:more',
            title: 'record details',
            variant: 'border-filled',
            alternativeText: 'Detail'
        }
    }
];

const modelCol = [
    {label: 'Name', fieldName: 'Name'},
    {label: 'Class', fieldName: 'Class__c'},
    {label: 'Price', fieldName: 'Price__c', type: 'currency'}
];

export default class CarMakersWithPlatformEvents extends LightningElement {

    @track columns = col;
    @track openModal = false;
    @track record = {};
    @api makerId;
    @track modelColumns = modelCol;
    @track showTemplate = false;
    @api eventMessage = {};
    @track areMakers = false;
    @track carMakers;
    @track channelName = '/event/Car_Insert__e';

    @wire(getCarMakerList)
    wireCarMakers(result){
        if(result.data){
            console.log(JSON.stringify(result.data));
            //console.log(JSON.stringify(eventMessage));
            this.carMakers = result.data;
            if(this.carMakers.length > 0)
                this.areMakers = true;
        }
        else if(result.error){
            console.log('This is the Error : ' + result.error);
        }

        this.handleSubscribe();
    }


    // Row action event to show the details of the record
    handleRowAction(event){
        this.record = event.detail.row;
        this.makerId = this.record.Id;
        this.openModal = true;
        console.log('This is the Row : ' + JSON.stringify(event.detail.row));
    }

    closeModal(){
        this.openModal = false;
    }   

    @api
    handleRecordInsertion() {
        //fireEvent(this.pageRef, 'forceRefresh'); // your LWCs pubsub to this channel
        console.log('This method is called when record is inserted');
        const recordInsertEvent = new CustomEvent('recordinsert', {
            detail: 'test123',
        });
        // Fire the custom event
        this.dispatchEvent(recordInsertEvent);
    }

    @api
    handleRecordInsertionParam(msg) {
        //fireEvent(this.pageRef, 'forceRefresh'); // your LWCs pubsub to this channel
        var carArray = []; 
        var car = {};
        var msgParse = JSON.parse(msg);
        var insertedCar = JSON.parse(msgParse.data.payload.Message__c);
        // console.log('This method is called with msg Param' + msg);
        // console.log('Message__c from msg Param: ' + msgParse.data.payload.Message__c);
        // console.log('insertedCar.Name: ' + insertedCar.name);

        car.Id = insertedCar.id;
        car.Name = insertedCar.name;
        car.Founded__c = insertedCar.founded__c
        car.Founder__c = insertedCar.founder__c;
        car.Number_of_employees__c = insertedCar.number_of_employees__c;
        car.Website__c = insertedCar.website__c;

        carArray.push(car);
        this.carMakers = carArray.concat(this.carMakers);
        // console.log('carArray[0].Name: ' + JSON.stringify(carArray[0]));


    }

    // Handles subscribe button click
    handleSubscribe() {
        // Callback invoked whenever a new event message is received
        const messageCallback = function(response) {
            // Response contains the payload of the new message received
            console.log('New message received : ', JSON.stringify(response));
            
        };

        // Invoke subscribe method of empApi. Pass reference to messageCallback
        subscribe(this.channelName, -1, messageCallback).then(response => {
            // Response contains the subscription information on successful subscribe call
            console.log('Successfully subscribed to : ', JSON.stringify(response.channel));

            var carArray = []; 
            var car = {};
            var msgParse = JSON.parse(JSON.stringify(response));
            var insertedCar = JSON.parse(msgParse.data.payload.Message__c);
            // console.log('This method is called with msg Param' + msg);
            // console.log('Message__c from msg Param: ' + msgParse.data.payload.Message__c);
            // console.log('insertedCar.Name: ' + insertedCar.name);
    
            car.Id = insertedCar.id;
            car.Name = insertedCar.name;
            car.Founded__c = insertedCar.founded__c
            car.Founder__c = insertedCar.founder__c;
            car.Number_of_employees__c = insertedCar.number_of_employees__c;
            car.Website__c = insertedCar.website__c;
    
            carArray.push(car);
            this.carMakers = carArray.concat(this.carMakers);
        });
    }
}