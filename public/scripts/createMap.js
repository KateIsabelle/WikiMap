let kMap, infoWindow;

function initMap() {
  const options = {
    center: { lat: 43.6532, lng: -79.3832 }, // montreal: { lat: 45.5017, lng: -73.5673 },
    zoom: 8,
  }

  kMap = new google.maps.Map(document.getElementById("init-map"), options);

  infoWindow = new google.maps.InfoWindow

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (p) {
      const position = {
        lat: p.coords.latitude,
        lng: p.coords.longitude
      }
      infoWindow.setPosition(position);
      infoWindow.setContent('Your location!');
      infoWindow.open(kMap);
      kMap.setCenter(position);
    }, function () {
      handleLocationError('Geolocation service failed', kMap.center())
    })
  } else {
    handleLocationError('No geolocation available', kMap.center())
  }
}

function handleLocationError(content, position) {
  infoWindow.setPosition(position);
  infoWindow.setContent(content);
  infoWindow.open(kMap)
}

// function initMap() {
  // Map options
  // const options = {
  //   zoom: zoom,
  //   center: { lat: latitude, lng: longtitude }
  // }
  // New map
  // const map = new google.maps.Map(document.getElementById('map'), options);

  // loadPins(pinsArr, map);
  // mapClick(map);
// }

// $(document).ready(function () {
// $("form").serialize();
// $(".create_map label").focus();
// $(".map-compose").val("").keyup().focus();

// });

// const mapObj = JSON.parse($('#mapObj').val());
// const pinsArr = JSON.parse($('#pinsArr').val());
// const latitude = mapObj.latitude;
// const longtitude = mapObj.longitude;
// const zoom = mapObj.zoom;

// // Add marker function
// const addMarker = (props, map) => {
//   const marker = new google.maps.Marker({
//     position: props.coords,
//     map: map,
//     draggable: true
//   });

//   // Listen to click on marker
//   marker.addListener('click', function (mapsMouseEvent) {
//     // Marker info window
//     const infoWindow = new google.maps.InfoWindow({
//       position: mapsMouseEvent.latLng,
//       content: props.pinInfo.title + "<br />" + props.pinInfo.description + "<br /><img src=" + props.pinInfo.image + " width=100 height=100>"
//     });
//     // infoWindow.close();
//     infoWindow.open(map, marker);
//   });
// }

// // Preload markers to the map
// const loadPins = (pinsArr, map) => {
//   for (let pin of pinsArr) {
//     const props = {
//       coords: {
//         lat: pin.lat,
//         lng: pin.lng
//       },
//       pinInfo: {
//         title: pin.title,
//         description: pin.description,
//         image: pin.photo_url
//       }
//     };
//     addMarker(props, map);
//   }
// }

// // Listen to click on the map then add a marker
// const mapClick = (map) => {
//   google.maps.event.addListener(map, 'click',
//     function (event) {
//       // Add marker on the map
//       addMarker({ coords: event.latLng }, map);
//     }
//   )
// };



