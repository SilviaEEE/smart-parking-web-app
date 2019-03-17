var express = require('express');
var app = express();//express variable
var http = require('http').createServer(app) //create server based on express app
var io = require('socket.io')(http); //open socket
const path = require('path'); 
var bodyParser = require('body-parser')
const PORT = process.env.PORT || 8000;

//app
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
  res.render(__dirname + '/public/index.html');
});

//API
app.use(bodyParser.json())
app.post('/arduinos', (req, res) => {
  // we get the list of arduinos with the new status
  updatedPoints = req.body.arduinos;
  console.log('updatedPoints',updatedPoints);

  if (!updatedPoints) {
    throw new Error('Error updating arduinos position.');
  }

  updatedPoints.forEach(arduino => {
    updateParkings(arduino)
  })

  io.emit('data', JSON.stringify(updatedPoints)); //sends to all clients currently connected
  res.writeHead(200);
  res.send();
});

//socket server
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('mapLoaded', function() {
    socket.emit('data', JSON.stringify(toArray(parkings)));
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

//helper function
function toArray (obj) {
  return Object.values(obj);
}

function updateParkings(parsedData) {
  parkings[`${parsedData.lng}+${parsedData.lat}`] = parsedData;
}

//data, should be in a database in practice
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

http.listen(PORT, () => console.log(`smart-parking-ucl app listening on port ${PORT}!`))
