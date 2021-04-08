// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$(document).ready(function (e) {
  $likeButton();


});
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


const $likeButton = function () {


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

      $.ajax({
        method: "POST",
        url: "/api/favourites",
        data: { map_id: $favourite },
        success: function (newFav) {
          console.log("success:", newFav)
          const query = `
          SELECT
          `

        },
        error: function () {
          alert('error on remove fav')
        }
      })
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

