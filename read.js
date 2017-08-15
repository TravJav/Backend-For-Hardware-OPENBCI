
 // import from ganglion npm file to get raw EEG data
import io from WebSocket.io;
import bluetooth_stream from 'scan.js';

const express = require('express'),
app = express(),
server = require('http').createServer(app),
io = require('socket.io')(server)
const socket = io("");





class Transfer {


constructor(){
    super();
this.bluetooth_stream = bluetooth_stream;

    
}

input_data(bluetooth_stream){
bluetooth_stream
   



}








}