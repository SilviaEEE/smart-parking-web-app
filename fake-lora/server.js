//const HOST = 'https://smart-parking-ucl.appspot.com/arduinos'
const HOST = 'http://localhost:8000/arduinos'
var axios = require('axios');
var app = require('http').createServer(),
  SerialPort = require('serialport');
  // define serial port according to your laptop
  var sp = new SerialPort('COM4', {
    baudRate: 9600
  }, true)

//arduino message
let arduinoMessage = '';
sp.on('data', function(data) {
  // concatenating the string buffers sent via usb port
  arduinoMessage += data.toString();
    console.log(arduinoMessage);
  // detecting the end of the string
  if (arduinoMessage.indexOf('\r') >= 0) {
    arduinoMessage=arduinoMessage.replace(/'/g, '"');//json object coming from arduino
    console.log('arduino message => ', arduinoMessage);
    var parsedData = JSON.parse(arduinoMessage);//json->js object

    // updateParkings(parsedData);
    var request = {
      arduinos: [parsedData]
    }
    axios.post(HOST, request) //axios allows post request to other servers
    .then(function (response) {
      console.log('sent to smart-parking.')
      arduinoMessage='';
    })
    .catch(function (error) {
      console.log('error');
    });  
  }
});

// just some debug listeners
sp.on('close', function(err) {
  console.log('Port closed!');
});

sp.on('error', function(err) {
  console.error('error', err);
});

sp.on('open', function() {
  console.log('Port opened!');
});

// creating the server ( localhost:8001 )
const PORT = process.env.PORT || 8001;
app.listen(PORT);
