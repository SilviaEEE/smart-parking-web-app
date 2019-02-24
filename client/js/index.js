var map;
var isMapInitialized = false;

var socket = io.connect('http://localhost:8000');

var iconBase = 'https://drive.google.com/uc?id=';
var icons = {
    free: {
        name: 'Free',
        icon: iconBase + '1QPAnX97AQF6T-n0o1_gPWCBCIAtrwaud'
    },
    occupied: {
        name: 'Occupied',
        icon: iconBase + '1bFDrMwPfs0EjfxXbgtTpVCEzeR1wfqyJ'
    }
}

// keep all the markers of the map
var markers = {}

function addMarker(parkingSpot) {
    // if the marker exist, we remove it.
    if (markers[parkingSpot.lat + '+' +parkingSpot.lng]) {
        markers[parkingSpot.lat + '+' +parkingSpot.lng].marker.setMap(null)
    }

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
}



function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 51.523285, lng: -0.1298344},
        zoom: 20
    });

    isMapInitialized = true;

    socket.emit('mapLoaded');
}

// when we receive data
socket.on('data', (data) => {
    console.log(data);

    data = JSON.parse(data);
    data.forEach(parking => {
        addMarker(parking);
    })
});

// if (isMapInitialized) {
//     var parkings = [
//         {
//             type: 'free',
//             lat: 51.523518,
//             lng: -0.130158
//         },
//         {
//             type: 'free',
//             lat: 51.523495,
//             lng: -0.130137
//         },
//         {
//             type: 'free',
//             lat: 51.523467,
//             lng: -0.130117
//         },
//         {
//             type: 'free',
//             lat: 51.523452,
//             lng: -0.130087
//         },
//         {
//             type: 'free',
//             lat: 51.523427,
//             lng: -0.130068
//         }
//     ]

//     parkings.forEach(parking => {
//         console.log(parking)
//         addMarker(parking);
//     })
// } else {
//     console.log('map not initilized')
// }

// setTimeout(() => {
//    if (isMapInitialized) {
//     var parkings = [
//         {
//             type: 'free',
//             lat: 51.523518,
//             lng: -0.130158
//         },
//         {
//             type: 'free',
//             lat: 51.523495,
//             lng: -0.130137
//         },
//         {
//             type: 'occupied',
//             lat: 51.523467,
//             lng: -0.130117
//         },
//         {
//             type: 'occupied',
//             lat: 51.523452,
//             lng: -0.130087
//         },
//         {
//             type: 'free',
//             lat: 51.523427,
//             lng: -0.130068
//         }
//     ]

//     parkings.forEach(parking => {
//         console.log(parking)
//         addMarker(parking);
//     })
//    } else {
//        console.log('map not initilized')
//    }
// }, 3000)

// setTimeout(() => {
//     let parking = {
//         type: 'occupied',
//         lat: 51.523427,
//         lng: -0.130068
//     }
    
//     addMarker(parking);

//     console.log(markers)
// }, 10000)




