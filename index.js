var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 51.523285, lng: -0.1298344},
    zoom: 20
  });

  var iconBase = '';
    var icons = {
        free: {
            name: 'Free',
            icon: 'http://gdurl.com/UHSY'
        },
        occupied: {
            name: 'Occupied',
            icon: 'http://gdurl.com/1_7E'
        }
    }

    var parkings = [
        {
            type: 'free',
            position: new google.maps.LatLng(51.523518,-0.130158)
        },
        {
            type: 'free',
            position: new google.maps.LatLng(51.523495,-0.130137)
        },
        {
            type: 'occupied',
            position: new google.maps.LatLng(51.523467,-0.130117)
        },
        {
            type: 'occupied',
            position: new google.maps.LatLng(51.523452,-0.130087)
        },
        {
            type: 'free',
            position: new google.maps.LatLng(51.523427,-0.130068)
        }
    ]

    parkings.forEach(parking => {
        new google.maps.Marker({
            position: parking.position,
            icon: {
                url: icons[parking.type].icon,
                scaledSize: new google.maps.Size(30, 30)
            },
            map: map
        });
    })
}




