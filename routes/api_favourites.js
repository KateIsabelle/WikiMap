const express = require("express");
const router = express.Router();
const { getMyFavourites, saveMyFavourite, deleteMyFavourite } = require('../queries/api_favourites_db');

module.exports = (db) => {

  router.post('/favourites', (req, res) => {
    // console.log("==> GET /maps -- display recent maps");
    //if user is not logged in, set userId to 0 (to avoid error)
    const userId = req.session.user_id ? req.session.user_id : 0;

    //id of the map where the click event was registered:
    const mapId = Number(req.body.map_id)
    let liked = false;

    getMyFavourites(db, userId, mapId)
      .then((myFavs) => {
        if (myFavs.length !== 0) {
          console.log("fav is already in db", myFavs.length)
          deleteMyFavourite(db, userId, mapId)
            .then((result) => {
              console.log("RESULT of deleting row___", result)
              liked = false
              return res.json({ liked, userId, mapId })

            })
        } else {
          console.log("no fav already in db")
          saveMyFavourite(db, userId, mapId)
            .then((result) => {
              console.log("RESULT of adding row____", result)
              liked = true
              return res.json({ liked, userId, mapId })

            })
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })
  return router
};
