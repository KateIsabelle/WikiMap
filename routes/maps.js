
const { Template } = require('ejs');
const express = require("express");
const router = express.Router();
const dbfns = require("../queries/maps_db");
const cookieSession = require("cookie-session");
const { getMapById } = require('../queries/maps_db');




module.exports = (db) => {
  // GET /
  // router.get("/", (req, res) => {
  //   db.query(
  //     `SELECT maps.* FROM maps
  //       ORDER BY created_at;`
  //   )
  //     .then((data) => {
  //       const maps = data.rows;
  //       res.render('index');
  //       // res.json({ maps });
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: err.message });
  //     });
  // });


  // GET /maps/create -- Display new map creation page
  router.get("/create", (req, res) => {
    console.log("==> GET /maps/create -- Create new map");
  });

  // POST /maps/create -- Create a new map
  router.post("/create", (req, res) => {
    console.log("==> POST /maps/create -- Create new map");
  });

  // GET /maps/:map_id  -- Display a map by id
  router.get('/:map_id', (req, res) => {
    console.log('==> GET /maps/:map_id  -- Display a map by id');

    const mapID = req.params.map_id;

    getMapById(db, mapID)
      .then((templateVars) => {
        res.render('map_show', templateVars);
      });
  });

  // POST /maps/:map_id/edit -- Edit a map
  router.post("/:map_id/edit", (req, res) => {
    console.log("==> POST /maps/:map_id/edit -- Edit a map");
  });

  // POST /maps/:map_id/delete -- Delete a map
  router.post("/:map_id/delete", (req, res) => {
    console.log("==> POST /maps/:map_id/delete -- Delete a map");
    const mapId = req.body.id;
    const userId = req.session.user_id;
    if (mapId && userId) {
      dbfns.deleteMap(id, userId);
      res.redirect("/maps");
    } else {
      res.status(401).send("You cannot delete it");
    }
  });

  return router;
};
