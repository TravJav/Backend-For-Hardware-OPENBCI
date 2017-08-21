
const _ = require('lodash');
const Bluetooth = require('./scan.js');
const express = require('express'),
app = express(),
server = require('http').createServer(app);
var io = require('socket.io')(server);
// libs

const Ganglion = require('openbci-ganglion').Ganglion;
const ganglion = new  Ganglion();


server.listen(8080, ()=>{
  console.log('Listening For  Client Connection');
});

io.on('connection', socket=>{
  console.log("\n Client has connected to our server");
   ganglion.searchStart();
console.log("I have finished searching");
  });

/*================================================================================================================================================================================
=============================================================================================================================================================================================================================
This function will take in the RAW EEG, EMG, ECG data and send the Array with 4 objects inside ( Microvolts) to the 
read.js class 

=============================================================================================================================================================================================================================
==============================================================================================================================================================================*/




ganglion.once('ganglionFound', (peripheral) => {
// Stop searching for BLE devices once a ganglion is found.
ganglion.searchStop();



ganglion.on('sample', _.throttle(sample => {
/** Work with sample */
console.log(sample.sampleNumber);
  
const transferdata = [];
    for (let i = 0; i < ganglion.numberOfChannels(); i++) {
        // Where the microvolts will be outputed
         // console.log("Channel " + (i + 1) + ": " + sample.channelData[i].toFixed(8) + " Volts.");
        //push sample.channelData[i].toFixed(8) into our transferdata array
        GanglionObjects = sample.channelData[i].toFixed(8);
        transferdata.push(GanglionObjects);

    }

    pass_data(transferdata);    
    }, 500, {leading:true}))
    






ganglion.once('ready', () => {
ganglion.streamStart();
});
ganglion.connect(peripheral);

});
 
/*
Function to actually pass the data from the socket to the front end

*/
function pass_data(transferdata){

console.log(transferdata);
io.emit("arraytransfer", transferdata);

}

