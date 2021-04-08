

function initMap() {
  let map = new google.maps.Map(document.getElementById("init-map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
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



