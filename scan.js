

const Bluetooth = require('./scan.js');
const express = require('express'),
app = express(),
server = require('http').createServer(app);
var io = require('socket.io')(server);
// libs

const Ganglion = require('openbci-ganglion').Ganglion;
const ganglion = new  Ganglion();


server.listen(8080, ()=>{
  console.log('Listening For  Client COnnection');
});

io.on('connection', socket=>{
  console.log("\n Client has connected to our server");
ganglion.searchStart();

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
    ganglion.on('sample', (sample) => {
    /** Work with sample */
    console.log(sample.sampleNumber);
    for (let i = 0; i < ganglion.numberOfChannels(); i++) {
    // Where the microvolts will be outputed
      console.log("Channel " + (i + 1) + ": " + sample.channelData[i].toFixed(8) + " Volts.");
    
     GanglionObjects = sample.channelData[i].toFixed(8);
     pass_data(GanglionObjects);
    }
    });

    ganglion.once('ready', () => {
      ganglion.streamStart();
    });
    ganglion.connect(peripheral);

  });


  

  
  
/*
Function to actually pass the data from the socket to the front end

*/


function pass_data(GanglionObjects){

console.log('socket has been connected');
io.emit("arraytransfer",GanglionObjects);

}

