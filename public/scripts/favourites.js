// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$(document).ready(function (e) {
  $likeButton();


});
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


const $likeButton = function () {
  $('.fa-heart').click(function () {
    $(this).toggleClass('liked');
    console.log("this val",$(this).val())

    if ($(this).hasClass('liked')) {
      console.log("THIS IS LIKED")
      $.ajax({
            url: "/",
            method: "GET"
          })
            .then(tweets => renderTweets(tweets))
            .catch(err => console.log(err))
      //add an ajax that adds method 'post' into table favourites

    } else {
      console.log("THIS IS NOT LIKED")
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
