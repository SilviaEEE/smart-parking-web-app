# Smart Parking Web App

Smart Parking web app is a web application that allows you to see live parking data from an Arduino in Google Maps

##Installation
Install all package dependencies running
```bash
npm install
```

##Run locally
Don't forget to update the baud rate and serial port in the fake-lora/server.js file 

Run the web server locally by running
```bash
npm start
```

If you want to update data using an Arduino, you need to plug your board, upload the arduino.ino to the board and run the fake lora using

```bash
node fake-lora/server.js
```
##To run on the cloud
Comment and uncomment the following line from the index.js file to run it on the cloud:
```javascript
const host = 'https://smart-parking-ucl.appspot.com' //app hosted in cloud
//const host = 'http://localhost:8000'
```

Top update the cloud with Arduino data. Comment and uncomment the following from fake-lora/server.js
```javascript
const HOST = 'https://smart-parking-ucl.appspot.com/arduinos'
//const HOST = 'http://localhost:8000/arduinos'
```