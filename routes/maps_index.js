const express = require("express");
const router = express.Router();
const { getFirstMaps } = require('../queries/maps_index_db');

module.exports = (db) => {
router.get('/', (req,res) => {
  console.log("==> GET /maps -- display recent maps")
  getFirstMaps(db)
  .then((templateVars) => {
    // res.render('map_show', templateVars);
    console.log("templateVars!!!!", templateVars);
    res.render("index", templateVars);
  });

});

return router

};

// router.get('/:map_id', (req, res) => {
//   console.log('==> GET /maps/:map_id  -- Display a map by id');

//   const mapID = req.params.map_id;

//   getMapById(db, mapID)
//     .then((templateVars) => {
//       res.render('map_show', templateVars);
//     });
// });
