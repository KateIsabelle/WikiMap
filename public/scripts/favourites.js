
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$(document).ready(function (e) {
  $likeButton();


});
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


const $likeButton = function () {

  $('.like-btn').click(function () {
    const $clickedMap = $(this).val();
    console.log("MapCLICKED__", $clickedMap)
    $(this).toggleClass('liked');

    $.ajax({
      method: "POST",
      url: "/api/favourites",
      data: { map_id: $clickedMap },
      success: function (fav) {

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

