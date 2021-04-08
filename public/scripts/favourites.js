
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$(document).ready(function (e) {
  $likeButton();


});
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


const $likeButton = function () {

  $('.fa-heart').click(function () {
    const $clickedMap = $(this).val();
    $(this).toggleClass('liked');

    return $.ajax({
      method: "POST",
      url: "/api/favourites",
      data: { map_id: $clickedMap },
      success: function (fav) {
        console.log("success:", fav)
        let query;
        //if this map is already liked by user, delete row
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
        console.log("query:", query)
        return query;
      },
      error: function () {
        alert('error on fav ajax request')
      }
    })


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

