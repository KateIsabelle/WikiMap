const express = require("express");
const router = express.Router();
const { getFirstMaps } = require('../queries/maps_index_db');


module.exports = (db, apiKey) => {
router.get('/', (req,res) => {
  console.log("==> GET /maps -- display recent maps")
  getFirstMaps(db)
  .then((maps) => {
    const templateVars = {
      maps,
      apiKey
    }
    console.log("templateVars!!!!", templateVars);
    res.render("index", templateVars);
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });

});

return router

};

