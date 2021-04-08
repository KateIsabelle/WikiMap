const { Template } = require("ejs");
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

  //show form for map creation
  router.get("/new", (req, res) => {
    const userId = req.session.user_id;
    dbUserFns
      .getUserById(db, userId)
      .then((user) => {
        const templateVars = {
          mapId: req.body.id,
          user,
          title: req.body.title,
          description: req.body.description,
          zoom: req.body.zoom,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
        };
        res.render("create", templateVars);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });

  //Create a new map
  router.post("/", (req, res) => {
    const mapId = req.body.id;
    const user = req.session.user_id;
    const maps = {
      mapId: req.body.id,
      user: user,
      title: req.body.title,
      description: req.body.description,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    };

    Promise.all([dbUserFns.getUserById(db, user), dbFns.createMap(db, maps)])
      .then(([user, maps]) => {
        const templateVars = { user, map: maps, pins: [] };
        res.render("map_show", templateVars);
      })
      .catch((error) => {
        console.log("error ==>", error);
        res.status(500).json(error);
      });
  });

  // GET /maps/:map_id  -- Display a map by id
  router.get('/:map_id', (req, res) => {
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
        res.render('map_show', templateVars);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // POST /maps/:map_id/addpin -- Add a pin
  router.post("/:map_id/addpin", (req, res) => {
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

  // POST /maps/:map_id/delete -- Delete a pin
  router.post("/:map_id/deletepin", (req, res) => {
    const mapID = req.params.map_id;
    const pin = {
      map_id: mapID,
      pin_id: req.body.pin_id
    }
    pinFns.deletePin(db, pin)
      .catch((err) => console.log(err));
    res.send('ok');
  });

  // POST /maps/:map_id/delete -- Delete a map
  router.post("/:map_id/delete", (req, res) => {
    const map_id = req.body.id;
    const user = req.session.user_id;

    Promise.all([
      dbUserFns.getUserById(db, user),
      dbFns.deleteMap(db, map_id, user),
    ])
      .then(res.redirect("/maps"))
      .catch((error) => {
        res.status(500).json(error);
      });
  });

  // POST /maps/:map_id/edit -- Edit a map
  router.post("/:map_id/edit", (req, res) => {
    console.log("==> POST /maps/:map_id/edit -- Edit a map");


  });
  return router;
};
