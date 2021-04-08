const express = require("express");
const router = express.Router();
const { getMyFavourites } = require('../queries/api_favourites_db');

module.exports = (db) => {

  router.post('/favourites', (req, res) => {
    console.log("==> GET /maps -- display recent maps");
    //if user is not logged in, set userId to 0 (to avoid error)
    const userId = req.session.user_id ? req.session.user_id : 0;

    //id of the map where the click event was registered:
    const mapId = Number(req.body.map_id)
    console.log("user id:", userId, "map id: ", mapId)
    getMyFavourites(db, userId)
    .then((myFavs) => {
      console.log("myFavs:", myFavs, "this map id:", mapId)
      const liked = myFavs.includes(mapId) ? true : false;


      res.json({ liked, userId, mapId })

    })
    //   getFavMaps(db, userId)
    //   .then((maps) => {

    //     console.log("INFO:", maps)
    //     let templateVars = {};
    //     templateVars.maps = maps;
    //     templateVars.apiKey = apiKey;
    //     // templateVars.user = userId; >>>>>>>
    //     res.render("favourites", templateVars);
    //   })

    //   .catch(err => {
    //     res
    //     .status(500)
    //     .json({ error: err.message });
    //   });
  })

  return router
};






