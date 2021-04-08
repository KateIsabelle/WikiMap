
const { Template } = require('ejs');
const express = require("express");
const router = express.Router();
const dbFns = require('../queries/maps_db');
const pinFns = require('../queries/pins_db');

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
      mapId: req.body.id,
      user: req.session.user_id,
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
      user: 1,
      title: req.body.title,
      description: req.body.description,
      zoom: req.body.zoom,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    }
    console.log(dbFns.createMap(db, maps));

    const templateVars = {
      map: maps,
      pins: []
    };
    res.render('map_show', templateVars);
  });

  // GET /maps/:map_id  -- Display a map by id
  router.get('/:map_id', (req, res) => {
    console.log('==> GET /maps/:map_id  -- Display a map by id');

    const mapID = req.params.map_id;
    const getMapByIdPromise = dbFns.getMapById(db, mapID);
    const getPinsPromise = dbFns.getPins(db, mapID);

    Promise.all([getMapByIdPromise, getPinsPromise])
      .then(([mapObj, pinsArr]) => {
        const templateVars = {
          map: mapObj,
          pins: pinsArr,
          apiKey: apiKey
        };
        res.render('add_pins', templateVars);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // POST /maps/:map_id/addpin -- Add a pin
  router.post("/:map_id/addpin", (req, res) => {
    console.log("==> POST /maps/:map_id/addpin -- Add a pin");
    const mapID = req.params.map_id;

    const pin = {
      map_id: mapID,
      lat: req.body.lat,
      lng: req.body.lng,
      title: req.body.title,
      description: req.body.title,
      photo_url: req.body.photo_url
    }

    pinFns.createPin(db, pin)
      .catch((err) => console.log(err));

    res.send('ok');
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
