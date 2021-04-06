const express = require("express");
const router = express.Router();
const { getFirstMaps, getPins } = require('../queries/maps_index_db');


module.exports = (db, apiKey) => {

router.get('/', (req,res) => {
  console.log("==> GET /maps -- display recent maps")
  let templateVars = {};
  getFirstMaps(db)
  .then((maps) => {
    templateVars.maps = maps;
    // console.log("templateVars!!!!", templateVars);
    getPins(db)
    .then((pinsArray) => {
      templateVars.pins = pinsArray;
      templateVars.apiKey = apiKey;
      console.log('TemplateVars.pins:', templateVars.pins)
      res.render("index", templateVars);
    })
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });

});

return router

};

