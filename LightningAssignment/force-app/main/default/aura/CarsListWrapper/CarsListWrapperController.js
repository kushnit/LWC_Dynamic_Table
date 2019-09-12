({
    subscribe : function(component, event, helper) {
        const empApi = component.find('empApi');
        //const channel = component.find('v.channel');
        const channel = "/event/Car_Insert__e";
        var replayId = -1;

        empApi.subscribe(channel, replayId, $A.getCallback(eventReceived => {
            // Process event (this is called each time we receive an event)
            console.log('Received event ', JSON.stringify(eventReceived));
            component.set('v.empMessage', eventReceived.data);
            component.find("carMakersMessage").handleRecordInsertion();
            component.find("carMakersMessage").handleRecordInsertionParam(JSON.stringify(eventReceived));
            //console.log(component.find("carMakersMessage").eventMessage);
            //$A.get('e.force:refreshView').fire();
            //eval("$A.get('e.force:refreshView').fire();");
        }))
        .then(subscription => {
            // Confirm that we have subscribed to the event channel.
            // We haven't received an event yet.
            console.log('Subscribed to channel ', subscription.channel);
            // Save subscription to unsubscribe later
        }
        );
    },

    handlerecordInsert: function(component, event) {
        // var filters = event.getParam('filters');
        // component.set('v.message', filters.length > 0 ? 'Your selection: ' + filters.join() : 'No selection');
        //component.set('v.showHide', false);
        //$A.get('e.force:refreshView').fire();
        // window.setTimeout(
        //     $A.getCallback(function() {
        //         if (component.isValid()) {
        //             component.set("v.showHide", true);
        //         }
        //     }), 2000
        // )
        // component.set('v.showHide', true);
    },
})