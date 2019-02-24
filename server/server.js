var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
  fs = require('fs'),
  url = require('url'),
  SerialPort = require('serialport');
  // initialize serialport using the /dev/cu.usbmodem1411 serial port
  // remember to change this string if your arduino is using a different serial port
  var sp = new SerialPort('COM4', {
    baudRate: 9600
  }, true),
  // this var will contain the message string dispatched by arduino
  arduinoMessage = '';
  /**
   * helper function to load any app file required by client.html
   * @param  { String } pathname: path of the file requested to the nodejs server
   * @param  { Object } res: http://nodejs.org/api/http.html#http_class_http_serverresponse
   */
  readFile = function(pathname, res) {
    // an empty path returns client.html
    if (pathname === '/')
      pathname = 'index.html';

    fs.readFile('client/' + pathname, function(err, data) {
      if (err) {
        console.log(err);
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200);
      res.end(data);
    });
  };
  // /**
  //  *
  //  * This function is used as proxy to print the arduino messages into the nodejs console and on the page
  //  * @param  { Buffer } buffer: buffer data sent via serialport
  //  * @param  { Object } socket: it's the socket.io instance managing the connections with the client.html page
  //  *
  //  */
  // sendMessage = function(buffer, socket) {
  //   // concatenating the string buffers sent via usb port
  //   arduinoMessage += buffer.toString();

  //   // detecting the end of the string
  //   if (arduinoMessage.indexOf('\r') >= 0) {
  //     // log the message into the terminal
  //     // console.log(arduinoMessage);
  //     // send the message to the client
  //     socket.volatile.emit('notification', arduinoMessage);
  //     // reset the output string to an empty value
  //     arduinoMessage = '';
  //   }
  // };

// // creating a new websocket
// io.sockets.on('connection', function(socket) {
//   // listen all the serial port messages sent from arduino and passing them to the proxy function sendMessage
//   sp.on('data', function(data) {
//     sendMessage(data, socket);
//   });
//   // listen all the websocket "lightStatus" messages coming from the client.html page
//   socket.on('lightStatus', function(lightStatus) {
//     sp.write(lightStatus + '\r', function() {
//       // log the light status into the terminal
//       console.log('the light should be: ' + lightStatus);
//     });
//   });
// });
io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('mapLoaded', function() {
  
    socket.emit('data', JSON.stringify(toArray(parkings)));

    // setTimeout(() => {
    //     let temp = [{
    //         type: 'occupied',
    //         lat: 51.523427,
    //         lng: -0.130068
    //     }];
        
    //     console.log('emit update on data');
    
    //     socket.emit('data', JSON.stringify(temp))
    // }, 10000);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });


});

function toArray (obj) {
  return Object.values(obj);
}

var parkings = {
  "-0.130158+51.523518": {
    type: 'free',
    lat: 51.523518,
    lng: -0.130158
  },
  "-0.130137+51.523495" : {
    type: 'free',
    lat: 51.523495,
    lng: -0.130137
  },
  "-0.130117+51.523467": {
    type: 'free',
    lat: 51.523467,
    lng: -0.130117
  },
  "-0.130087+51.523452":{
    type: 'free',
    lat: 51.523452,
    lng: -0.130087
  },
  "-0.130068+51.523427":{
    type: 'free',
    lat: 51.523427,
    lng: -0.130068
  }
}


function updateParkings(parsedData) {
  parkings[`${parsedData.lng}+${parsedData.lat}`] = parsedData;
}

// setTimeout(() => {
//   let temp = [{
//       type: 'occupied',
//       lat: 51.523495,
//       lng: -0.130137
//   }];
  
//   console.log('emit update on data');

//   io.emit('data', JSON.stringify(temp))
// }, 5000);


sp.on('data', function(data) {
  // concatenating the string buffers sent via usb port
  arduinoMessage += data.toString();
    console.log(arduinoMessage);
  // detecting the end of the string
  if (arduinoMessage.indexOf('\r') >= 0) {
    // log the message into the terminal
    // console.log(arduinoMessage);
    // send the message to the client
    arduinoMessage=arduinoMessage.replace(/'/g, '"');
    console.log(arduinoMessage);
    var parsedData = JSON.parse(arduinoMessage);
    updateParkings(parsedData);

    io.emit('data', JSON.stringify([parsedData]));
    // reset the output string to an empty value
    arduinoMessage = '';
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

// creating the server ( localhost:8000 )
app.listen(8000);
// server handler
function handler(req, res) {
  readFile(url.parse(req.url).pathname, res);
}