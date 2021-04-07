const express = require("express");
const router = express.Router();
const { getFavMaps } = require('../queries/favourites_db');

module.exports = (db, apiKey) => {

  router.get('/', (req,res) => {
  console.log("==> GET /maps -- display recent maps");
  //if user is not logged in, set userId to 0 (to avoid error)
  const userId = req.session.user_id ? req.session.user_id : 0;
  if (!userId) {
    console.log("REDIRECT WORKING")
    return res.redirect('/maps')
  }

  getFavMaps(db, userId)
  .then((maps) => {

    console.log("INFO:", maps)
    let templateVars = {};
    templateVars.maps = maps;
    templateVars.apiKey = apiKey;
    // templateVars.user = userId; >>>>>>>
    // console.log('TemplateVars:', templateVars)
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






