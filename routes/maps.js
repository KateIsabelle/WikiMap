const { Template } = require('ejs');
const express = require('express');
const router = express.Router();
const { getMapById, getPins } = require('../queries/maps_db');

module.exports = (db, api) => {
  // GET /maps/
  router.get('/', (req, res) => {
    db.query(`SELECT * FROM maps;`)
      .then(data => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // GET /maps/create -- Display new map creation page
  router.get('/create', (req, res) => {
    console.log('==> GET /maps/create -- Create new map');
    getPins(db, 3)
    .then(r => res.json(r));
  });

  // POST /maps/create -- Create a new map
  router.post('/create', (req, res) => {
    console.log('==> POST /maps/create -- Create new map');
  });

  // GET /maps/:map_id  -- Display a map by id
  router.get('/:map_id', (req, res) => {
    console.log('==> GET /maps/:map_id  -- Display a map by id');

    const mapID = req.params.map_id;
    let templateVars = {};
    getMapById(db, mapID)
      .then((mapObj) => {
        templateVars.map = mapObj;
        getPins(db, mapID)
        .then((pinsArray) => {
          templateVars.pins = pinsArray;
          console.log('pins array = ',templateVars.pins);
          res.render('map_show', templateVars);
        })
      });
  });

  // POST /maps/:map_id/edit -- Edit a map
  router.post('/:map_id/edit', (req, res) => {
    console.log('==> POST /maps/:map_id/edit -- Edit a map');
  });

  // POST /maps/:map_id/delete -- Delete a map
  router.post('/:map_id/delete', (req, res) => {
    console.log('==> POST /maps/:map_id/delete -- Delete a map');
  });

  return router;
};
