var map;
var isMapInitialized = false;

//const host = 'https://smart-parking-ucl.appspot.com' //app hosted in cloud
const host = 'http://localhost:8000'  //can test in localhost
var socket = io.connect(host);

//images
var iconBase = 'https://drive.google.com/uc?id=';
var icons = {
    free: {
        name: 'Free',
        icon: iconBase + '1vtEmw-INR9NX6ssoFTlgnzk5t85YYy5g'
    },
    occupied: {
        name: 'Occupied',
        icon: iconBase + '1EjPtpjvCr5wHTeduQmpTA_R68xvQGNAW'
    }
}

// keep all the markers of the map
var markers = {}

function addMarker(parkingSpot) {
    // if the marker exist, we remove it.
    if (markers[parkingSpot.lat + '+' +parkingSpot.lng]) {
        markers[parkingSpot.lat + '+' +parkingSpot.lng].marker.setMap(null)
    }
    //creates the marker at position
    markers[parkingSpot.lat + '+' +parkingSpot.lng] = {
        type: parkingSpot.type,
        marker: new google.maps.Marker({
            position: new google.maps.LatLng(parkingSpot.lat,parkingSpot.lng),
            icon: {
                url: icons[parkingSpot.type].icon,
                scaledSize: new google.maps.Size(30, 30)
            },
            map: map
        })
    } 
    console.log('marker', parkingSpot.lat + '+' +parkingSpot.lng, 'added')
}


//function to load map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 51.523285, lng: -0.1298344},
        zoom: 20
    });

    isMapInitialized = true;
    console.log('map is loaded')
    socket.emit('mapLoaded');
}

// when we receive data
socket.on('data', (data) => {  
    data = JSON.parse(data);
    data.forEach(parking => {
        addMarker(parking);
    })
});