// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$(document).ready(function(e) {
// $likeButton();


});
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


const $likeButton = function() {
  $('.fa-heart').click(function() {
    console.log("HEART CLICKED")
    $(this).toggleClass('liked');
  })
}

const getFirstMaps = (db) => {
  const query = `
      SELECT maps.*, users.name as user_name, array_agg(pins.lat || ',' || pins.lng) as markers
       FROM maps
       JOIN users ON user_id = users.id
       LEFT JOIN pins ON pins.map_id = maps.id
       GROUP BY maps.id, users.name
       ORDER BY id DESC
       LIMIT 4
    ;`;
  return db
    .query(query)
    .then(data => {
      const mapsArray = data.rows;
      for (let map of mapsArray) {
        if (!map.markers[0]) {
          map.markersQuery = "";
          map.markers = [];
        } else {
          map.markersQuery = map.markers.map((m) => `markers=${m}`).join(`&`) + "&";
        }
      }
      return mapsArray;

    })
};


// const loadTweets = function() {
//   $.ajax({
//     url: "/tweets",
//     method: "GET"
//   })
//     .then(tweets => renderTweets(tweets))
//     .catch(err => console.log(err))
// }

// const $getMyFavourites = (db) => {
//   const myId = req.session.user_id;
//   console.log("USER ID FROM COOKIE", myId);

//   const query = `
//   SELECT * FROM favourites
//   WHERE user_id = ${myId}
//   `
// }
