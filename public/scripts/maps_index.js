// const templateVars = require('../../routes/maps_index');

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
$(document).ready(function() {

insertSmallMap();
  // al();

  // insertSmallMap();
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const al = () => {
  alert("Hello")
};

const insertSmallMap = () => {
  $('#map-container').html(`
  <div>Map Title - <a href="#">User Name</a></div>
  <div class="small-map" id="map-1"><img src="https://maps.googleapis.com/maps/api/staticmap?center=43.8728,-79.4183&zoom=13&size=400x200&maptype=roadmap&key=${apiKey}">
  </div>
  `);

}
// requirejs(["../../routes/maps_index"], function (tv) {
//   const headerEl = document.getElementById("header");
//   headerEl.textContent = lodash.upperCase("hello world");
// });




const loadMaps = function() {
  $.ajax({
    url: "/tweets",
    method: "GET"
  })
    .then(tweets => renderTweets(tweets))
    .catch(err => console.log(err))
}


// <% for(let map of maps) { %>
//   <div class=inner-cont>
//     <div><%= map.title %><a href="#"><%= map.user_name %></a></div>
//     <div class="small-map" id="map-1"><img src="https://maps.googleapis.com/maps/api/staticmap?center=<%=map.latitude%>,<%=map.longitude%>&zoom=13&size=400x200&maptype=roadmap&key=<%=apiKey%>"></div>
//   </div>

//   <% } %>
