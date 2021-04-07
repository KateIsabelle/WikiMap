const mapObj = JSON.parse($('#mapObj').val());
const pinsArr = JSON.parse($('#pinsArr').val());
const latitude = mapObj.latitude;
const longtitude = mapObj.longitude;
const zoom = mapObj.zoom;
const input = document.getElementById('search-input');

// Add marker function
const addMarker = (props, map) => {
  const marker = new google.maps.Marker({
    position: props.coords,
    map: map,
    draggable: true
  });

  // Listen to click on marker
  marker.addListener('click', function (mapsMouseEvent) {
    // Marker info window
    const infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
      content: props.pinInfo.title + "<br />" + props.pinInfo.description + "<br /><img src=" + props.pinInfo.image + " width=100 height=100>"
    });
    // infoWindow.close();
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
  const autocomplete = new google.maps.places.Autocomplete(input);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

  // Bias the SearchBox results towards current map's viewport.
  autocomplete.bindTo('bounds', map);

  // Set the data fields to return when the user selects a place.
  autocomplete.setFields(
    ['address_components', 'geometry', 'name', 'place_id','photos']);

    // Listen for the event fired when the user selects a prediction and retrieve more details for that place.
    autocomplete.addListener('place_changed', function() {
      const place = autocomplete.getPlace();

      console.log('place',place.geometry.location.lat());
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      const bounds = new google.maps.LatLngBounds();

      const photos = place.photos;

      if (!photos) {
        return;
      }
      const marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name,
        icon: photos[0].getUrl({maxWidth: 150, maxHeight: 150})
      })


    if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
  });
}

function initMap() {
  // Map options
  const options = {
    zoom: 10,
    center: { lat: latitude, lng: longtitude }
  }
  // New map
  const map = new google.maps.Map(document.getElementById('map'), options);

  //loadPins(pinsArr, map);
  initAutocomplete(map);

}
