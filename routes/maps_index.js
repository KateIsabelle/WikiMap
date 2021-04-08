const express = require("express");
const router = express.Router();
const { getFirstMaps } = require('../queries/maps_index_db');

module.exports = (db, apiKey) => {

  router.get('/', (req,res) => {
  console.log("==> GET /maps -- display recent maps");
  //if user is not logged in, set userId to 0 (to avoid error)
  const userId = req.session.user_id ? req.session.user_id : 0;

  getFirstMaps(db, userId)
  .then((maps) => {

    console.log("INFO:", maps)
    let templateVars = {};
    templateVars.maps = maps;
    templateVars.apiKey = apiKey;
    // templateVars.user = userId; >>>>>>>
    console.log('TemplateVars:', templateVars)
    res.render("index", templateVars);
    })

    .catch(err => {
      console.log("ERROR", err)
      res
        .status(500)
        .json({ error: err.message });
    });
  })

return router

};






