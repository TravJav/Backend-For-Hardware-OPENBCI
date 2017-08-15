
 // import from ganglion npm file to get raw EEG data
//import io from WebSocket.io;
const Bluetooth = require('./scan.js');
//const express = require('express'),
//app = express()
//server = require('http').createServer(app),
//io = require('socket.io')(server)
//const socket = io("");

/*
NAVIGATION:

 ATT: bluetooth_stream is the function being passed in the scan.js class which is inputting the microvolts in an Array of 4 objects

*/
//class Transfer {
/*
constructor(){

this.bluetooth_stream = bluetooth_stream;


}
*/
/*
Pass in the data to function
*/


function input_data() {

console.log("-------------------------------+ ");
 Bluetooth. bluetoothData();


}


input_data();



    
   














/*
server.listen(8080, ()=>{
    console.log('Listening For  Client COnnection');
})

*/