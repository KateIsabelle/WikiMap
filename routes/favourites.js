const express = require("express");
const router = express.Router();
const { getFavMaps } = require('../queries/favourites_db');
const dbUserFns = require("../queries/users_db");

module.exports = (db, apiKey) => {
  //==> GET /maps -- display recent maps
  router.get('/', (req, res) => {
    let userPromise;
    if (req.session.user_id) {
      userPromise = dbUserFns.getUserById(db, req.session.user_id);
    } else {
      return res.redirect('/maps');
    }
    const getFavMapsPromise = getFavMaps(db, req.session.user_id);

    Promise.all([userPromise, getFavMapsPromise])
      .then(([user, maps]) => {
        let templateVars = {};
        templateVars.user = user;
        templateVars.maps = maps;
        templateVars.apiKey = apiKey;
        res.render("favourites", templateVars);
      })

      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  })

  return router
};






