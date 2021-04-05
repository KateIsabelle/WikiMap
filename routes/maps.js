
const { Template } = require('ejs');
const express = require("express");
const router = express.Router();
const dbfns = require("../queries/maps_db");
const cookieSession = require("cookie-session");
const { getMapById } = require('../queries/maps_db');


module.exports = (db, api) => {
  // GET /maps/

  router.get("/", (req, res) => {
    db.query(
      `SELECT maps.* FROM maps
        ORDER BY created_at;`
    )
      .then((data) => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });


  router.get("/new", (req, res) => {
    console.log("==> GET /maps/create -- Create new map");
    // if (!user) {
    //   res.redirect("/login");
    //   return;
    // }
    const templateVars = {
      // mapId: req.body.id,
      // user: req.session.user_id,
      title: req.body.title,
      description: req.body.description,
      zoom: req.body.zoom,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    }
    res.render('create', templateVars);
  });

  // POST /maps/create -- Create a new map
  router.post("/", (req, res) => {
    console.log("==> POST /maps/create -- Create new map");
    const mapId = req.body.id;
    const user = req.session.user_id;
     // if (!user) {
    //   res.redirect("/login");
    //   return;
    // }
    const maps = {
      mapId: req.body.id,
      user: req.session.user_id,
      title: req.body.title,
      description: req.body.description,
      zoom: req.body.zoom,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    }
    console.log('maps ==>', maps);

    console.log(dbfns.createMap(db, maps));
    res.render('map_show.ejs');
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
    const user = req.session.user_id;
    if (mapId && user) {
      dbfns.deleteMap(mapId, user);
      res.redirect("/maps");
    } else {
      res.status(401).send("You cannot delete it");
    }
  });

  return router;
};
