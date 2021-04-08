const mapObj = JSON.parse($('#mapObj').val());
const pinsArr = JSON.parse($('#pinsArr').val());
const latitude = mapObj.latitude;
const longtitude = mapObj.longitude;
const zoom = mapObj.zoom;
const input = document.getElementById('search-input');
let map;
let newMarkerProps = {};
let deleteObj = {};
let infoWindow = null;

// Add marker function
const addMarker = (props, map) => {
  const marker = new google.maps.Marker({
    position: props.coords,
    map: map,
    id: props.pinInfo.id,
    animation: google.maps.Animation.DROP
  });
  // Listen to click on marker
  marker.addListener('click', function (mapsMouseEvent) {
    if (infoWindow) {
      infoWindow.close();
    }
    // Marker info window
    const contentString = `
      ${props.pinInfo.title}<br />
      ${props.pinInfo.description}<br />
      <img id="infoWindow" src=${props.pinInfo.image}>
      <button onclick="deletePin(${props.pinInfo.id})">Delete PIN</button>
    `;
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
      content: contentString
    })
    infoWindow.open(map, marker);
  });
}

// Preload markers to the map
const loadPins = (pinsArr, map) => {
  for (let pin of pinsArr) {
    const props = {
      coords: {
        lat: pin.lat,
        lng: pin.lng
      },
      pinInfo: {
        id: pin.id,
        title: pin.title,
        description: pin.description,
        image: pin.photo_url
      }
    };
    addMarker(props, map);
  }
}


function initAutocomplete (map) {
  // Create the search box and link it to the UI element.
  const input = document.getElementById('my-input-searchbox');
  const pinDesc = document.getElementById('pin-desc');
  const pinImage = document.getElementById('pin-image');

  const autocomplete = new google.maps.places.Autocomplete(input);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

  // Bias the SearchBox results towards current map's viewport.
  autocomplete.bindTo('bounds', map);

  // Set the data fields to return when the user selects a place.
  autocomplete.setFields(
    ['address_components', 'geometry', 'name', 'place_id', 'photos']);

    // Listen for the event fired when the user selects a prediction and retrieve more details for that place.
    autocomplete.addListener('place_changed', function() {
      const place = autocomplete.getPlace();

      // Save pin info to addPinObj
      newMarkerProps = {
        coords: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        },
        pinInfo: {
          title: place.name,
          description: pinDesc,
          photo_url: pinImage
          // photo_url: $(place.photos[0].html_attributions[0]).attr('href')
        }
      };

      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      const marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name,
        // icon: photos[0].getUrl({maxWidth: 150, maxHeight: 150})
      })

    // if (place.geometry.viewport) {
    //   // Only geocodes have viewport.
    //   bounds.union(place.geometry.viewport);
    // } else {
    //   bounds.extend(place.geometry.location);
    // }
    //map.fitBounds(bounds);
  });
}

function initMap() {
  // Map options
  const options = {
    zoom: zoom,
    center: { lat: latitude, lng: longtitude }
  }
  // New map
  map = new google.maps.Map(document.getElementById('map'), options);

  loadPins(pinsArr, map);
  initAutocomplete(map);
}

function addPin() {
  $.ajax({
    url: `/maps/${mapObj.id}/addpin`,
    method: "POST",
    data: newMarkerProps
  })
    .then((res) => {
      addMarker(newMarkerProps, map);
    })
    .catch((err) => {
      console.log(err);
      // $('#error-msg').innerHTML = 'Something went wrong ...';
    });
};

function deletePin(id) {
  $.ajax({
    url: `/maps/${mapObj.id}/deletepin`,
    method: "POST",
    data: {pin_id: id},
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
};
