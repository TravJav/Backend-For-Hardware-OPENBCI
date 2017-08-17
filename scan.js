


// libs

const Ganglion = require('openbci-ganglion').Ganglion;
const ganglion = new  Ganglion();






let GanglionChannels = ganglion.numberOfChannels();




/*================================================================================================================================================================================
=============================================================================================================================================================================================================================
This function will take in the RAW EEG, EMG, ECG data and send the Array with 4 objects inside ( Microvolts) to the 
read.js class 

=============================================================================================================================================================================================================================
==============================================================================================================================================================================*/
 function  bluetooth_stream() {

ganglion.once('ganglionFound', (peripheral) => {
// Stop searching for BLE devices once a ganglion is found.
ganglion.searchStop();
ganglion.on('sample', (sample) => {
/** Work with sample */
console.log(sample.sampleNumber);
for (let i = 0; i < ganglion.numberOfChannels(); i++) {
// Where the microvolts will be outputed
  console.log("Channel " + (i + 1) + ": " + sample.channelData[i].toFixed(8) + " Volts.");

  let GanglionObjects = sample.channelData[i].toFixed(8);

}
});


ganglion.once('ready', () => {
ganglion.streamStart();
});
ganglion.connect(peripheral);
});


// Start scanning for BLE devices
ganglion.searchStart();
}



// function that will be accessible


module.exports = {

  bluetoothData : bluetooth_stream,
  GanglionData : GanglionObjects,
  ChannelSize: GanglionChannels  


}