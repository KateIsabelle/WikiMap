
const { Template } = require('ejs');
const express = require("express");
const router = express.Router();
const dbFns = require('../queries/maps_db');
const { getMapById, getPins } = require('../queries/maps_db');

module.exports = (db, apiKey) => {
  // // GET /maps/
  // router.get('/', (req, res) => {
  //   db.query(`SELECT * FROM maps;`)
  //     .then(data => {
  //       const maps = data.rows;
  //       res.json({ maps });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });


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

    dbFns.createMap(db, maps);
    res.render('map_show.ejs');
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
          templateVars.apiKey = apiKey;
          console.log('pins array = ',templateVars.pins);
          res.render('map_show', templateVars);
        })
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
