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

    if ($(this).hasClass('liked')) {
      console.log("THIS IS LIKED")

      $.ajax({
        method: "POST",
        url: "/api/favourites",
        data: { map_id: $favourite },
        success: function (newUnfav) {

        },
        error: function () {
          alert('error on remove fav')
        }
      })

    } else {
      console.log("THIS IS NOT LIKED")

      $.ajax({
        method: "POST",
        url: "/api/favourites", //????? /api/favourites -- from backend?
        data: { map_id: $favourite },
        success: function (newFav) {
          console.log("success:", newFav)

        },
        error: function () {
          alert('error on remove fav')
        }
      })
    }

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

// .then(tweets => renderTweets(tweets))
//         .catch(err => console.log(err))
      //add an ajax that adds method 'post' into table favourites
