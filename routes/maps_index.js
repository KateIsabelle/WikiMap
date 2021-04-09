const express = require("express");
const router = express.Router();
const { getFirstMaps } = require('../queries/maps_index_db');
const dbUserFns = require("../queries/users_db");

module.exports = (db, apiKey) => {

  router.get('/', (req, res) => {
    console.log("==> GET /maps -- display recent maps");
    //if user is not logged in, set userId to 0 (to avoid error)
    const userId = req.session.user_id ? req.session.user_id : 0;

    const firstMapsPromise = getFirstMaps(db, userId);
    const userPromise = dbUserFns.getUserById(db, userId);

    Promise.all([firstMapsPromise, userPromise])
      .then(([maps, user]) => {
        let templateVars = {};
        templateVars.maps = maps;
        templateVars.apiKey = apiKey;
        templateVars.user = user;
        console.log('TemplateVars:', templateVars)
        res.render("index", templateVars);
      })
      .catch(err => {
        console.error("Failed to load map index", err)
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  return router

};






