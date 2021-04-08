let kMap, infoWindow, position;

function initMap() {
  const options = {
    //starts with center world location zoomed out
    center: { lat: 46.514059, lng: -5.712638 },
    zoom: 2
  }

  kMap = new google.maps.Map(document.getElementById("init-map"), options);

  infoWindow = new google.maps.InfoWindow

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (p) {
      position = {
        lat: p.coords.latitude,
        lng: p.coords.longitude
      }
      //when map is finished loading, we put this value into input
      document.getElementById('latitude').value = position.lat;
      document.getElementById('longitude').value = position.lng;

      infoWindow.setPosition(position);
      infoWindow.setContent('Your location!');
      infoWindow.open(kMap);
      kMap.setCenter(position);
      kMap.setZoom(8)
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






