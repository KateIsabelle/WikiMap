const express = require("express");
const router = express.Router();
const { getFirstMaps, getPins } = require('../queries/maps_index_db');
const tv = "HELLO";

module.exports = (db, apiKey) => {

  router.get('/', (req,res) => {
  console.log("==> GET /maps -- display recent maps");
  getFirstMaps(db)
  .then((maps) => {
    let templateVars = {};
    templateVars.maps = maps;
    templateVars.apiKey = apiKey;
    // console.log('TemplateVars:', templateVars)
    res.render("index", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })


return router

};

// module.exports = { renderSmallMaps, tv }





