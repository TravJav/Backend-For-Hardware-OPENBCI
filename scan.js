
const _ = require('lodash');
const Bluetooth = require('./scan.js');
const express = require('express'),
  app = express(),
  server = require('http').createServer(app);
var io = require('socket.io')(server);
var geolocation = require('geolocation')
const Ganglion = require('openbci-ganglion').Ganglion;
const ganglion = new Ganglion();
var find_device = ganglion.once('ganglionFound'(peripheral));

server.listen(8080, () => {
  console.log('Listening For  Client Connection');
});

io.on('connection', socket => {
  console.log("\n Client has connected to our server");
  ganglion.searchStart();
  find_device();
  console.log("I have finished searching");
}

function find_device() {
    ganglion.searchStop();
    ganglion.on('sample', (sample => {
      const transferdata = [];
      for (let i = 0; i < ganglion.numberOfChannels(); i++) {
        GanglionObjects = sample.channelData[i].toFixed(8);
        transferdata.push(GanglionObjects);
      }
      pass_data(transferdata);
      ganglion.once('ready', () => {
        ganglion.streamStart();
      });
      ganglion.connect(peripheral);
    }));
  }


