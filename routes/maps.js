const { Template } = require('ejs');
const express = require('express');
const router = express.Router();

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
  });

  // POST /maps/create -- Create a new map
  router.post('/create', (req, res) => {
    console.log('==> POST /maps/create -- Create new map');
  });

  // GET /maps/:map_id  -- Display a map by id
  router.get('/:map_id', (req, res) => {
    console.log('==> GET /maps/:map_id  -- Display a map by id');
    const mapID = req.params.map_id;
    console.log('mapID= ',mapID);
    db.query(`SELECT * FROM maps
    WHERE id = $1;`, [mapID])
      .then(data => {
        const maps = data.rows[0];
        const templateVars = {
          id: maps.id,
          title: maps.title,
          image: maps.image,
          latitude: maps.latitude,
          longitude: maps.longitude,
          zoom: maps.zoom,
        }
        res.render('map_show', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
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
