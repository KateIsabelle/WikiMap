const renderMaps = (maps) => {
  $("#maps-container").empty();
  for (let map of maps) {
    $("#maps-container").prepend(createMapElement(map));
  }
};

const sendMapToServer = (map) => {
  $.ajax({
    url: "/", //'/maps
    method: "POST",
    data: map,
  })
    .then((res) => {
      loadMaps();
      console.log("Map has been sent", res);
    })
    .catch((err) => console.log(err));
};

const loadMaps = () => {
  $.ajax({
    url: "/maps",
    method: "GET",
  })
    .then((res) => {
      renderMaps(res);
    })
    .catch((err) => console.log(err));
};

const handleSubmit = (event) => {
  event.preventDefault();
  const data = $("form").serialize();
  sendMapToServer(data);
}

$(document).ready(function () {
  $("form").on("submit", handleSubmit);
  $("form").keypress(function (e) {
    if (e.which === 13) {
      handleSubmit(e);
      return false;
    }
  })
});
