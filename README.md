# Smart Parking Web App

Smart Parking web app is a web application that allows you to see live parking data from an Arduino in Google Maps

##Installation
Install all package dependencies running
```bash
npm install
```

##Usage
Run the web server locally by running
```bash
npm start
```

If you want to update data using an Arduino, you need to plug your board, upload the arduino.ino to the board and run the fake lora using

```bash
node fake-lora/server.js
```

Don't forget to update the baud rate and serial port in the fake-lora/server.js file 

Can comment and uncomment the following line from the index.js file to run it locally or on the cloud:

```javascript
const host = 'https://smart-parking-ucl.appspot.com' //app hosted in cloud
//const host = 'http://localhost:8000'
```
