const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // GET /maps/
  router.get('/', (req, res) => {
    db.query(`SELECT maps.* FROM maps
        ORDER BY created_at;`)
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

  // GET /maps/:map_id  -- Display a map by id
  router.get('/:map_id', (req, res) => {
    console.log('==> GET /maps/:map_id  -- Display a map by id');
  });

  // GET /maps/create -- Create new map
  router.get('/create', (req, res) => {
    console.log('==> GET /maps/create -- Create new map');
  });

  // POST /maps/:map_id/edit -- Edit a map
  router.post('/:map_id/edit', (req, res) => {
    console.log('==> POST /maps/:map_id/edit -- Edit a map');
  });

  // POST /maps/:map_id/delete -- Delete a map
  router.get('/:map_id/delete', (req, res) => {
    console.log('==> POST /maps/:map_id/delete -- Delete a map');
  });

  return router;
};
