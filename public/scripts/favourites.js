const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const apiKey = require('./lib/api.js');
const db = new Pool(dbParams);
db.connect();


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$(document).ready(function (e) {
  $likeButton();


});
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


const $likeButton = function (db) {


  $('.fa-heart').click(function () {
    console.log("this val", $(this).val())
    const $favourite = $(this).val();
    // const data = { $favourite };
    $(this).toggleClass('liked');

    // if ($(this).hasClass('liked')) {
    //   console.log("THIS IS LIKED")

    //   $.ajax({
    //     method: "POST",
    //     url: "/api/favourites",
    //     data: { map_id: $favourite },
    //     success: function (newUnfav) {

    //     },
    //     error: function () {
    //       alert('error on remove fav')
    //     }
    //   })

    // } else {
      console.log("THIS IS NOT LIKED")

       return $.ajax({
        method: "POST",
        url: "/api/favourites",
        data: { map_id: $favourite },
        success: function (fav) {
          console.log("success:", fav)
          //if this map is already liked by user, delete row
          let query;
          if (fav.liked) {
            query = `
            DELETE FROM favourites
            WHERE map_id = ${fav.mapId}
            AND user_id = ${fav.userId}
            `
          } else {
            //else, add row
            query = `
            INSERT INTO favourites (map_id, user_id)
            VALUES (${fav.mapId}, ${fav.userId});
            `
          }

        },
        error: function () {
          alert('error on remove fav')
        }
      })
      .query(query)
    // }

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

      return

    })
};

