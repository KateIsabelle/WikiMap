
const { Template } = require('ejs');
const express = require("express");
const router = express.Router();
const dbFns = require('../queries/maps_db');
const dbUserFns = require("../queries/users_db");
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

    const userId = req.session.user_id;

    dbUserFns.getUserById(db, userId)
    .then(user => {
      const templateVars = {
        mapId: req.body.id,
        user,
        title: req.body.title,
        description: req.body.description,
        zoom: req.body.zoom,
        latitude: req.body.latitude,
        longitude: req.body.longitude
      }
      res.render('create', templateVars);
    })
    .catch(error => {
      res.status(500).json(error);
    })
  });

  // POST /maps/create -- Create a new map
  // router.post("/", (req, res) => {
  //   console.log("==> POST /maps/create -- Create new map");
  //   const mapId = req.body.id;
  //   const user = req.session.user_id;
  //    // if (!user) {
  //   //   res.redirect("/login");
  //   //   return;
  //   // }
  //   const maps = {
  //     mapId: req.body.id,
  //     user: 1,
  //     title: req.body.title,
  //     description: req.body.description,
  //     zoom: req.body.zoom,
  //     latitude: req.body.latitude,
  //     longitude: req.body.longitude
  //   }
  //   console.log(dbFns.createMap(db, maps));

  //   const templateVars = {
  //     map: maps,
  //     pins: []
  //   };
  //   res.render('map_show', templateVars);
  // });

router.post("/", (req, res) => {
    console.log("==> POST /maps/create -- Create new map");
    const mapId = req.body.id;
    const user = req.session.user_id;
console.log("user==>", user);
    const maps = {
      mapId: req.body.id,
      user: user,
      title: req.body.title,
      description: req.body.description,
      zoom: req.body.zoom,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    }

    Promise.all([dbUserFns.getUserById(db, user), dbFns.createMap(db, maps)])
    .then(([user, maps]) => {
      console.log("user==>", user);
      const templateVars = { user, map: maps, pins: [] };
      res.render("map_show", templateVars);
    })
    .catch(error => {
      res.status(500).json(error);
    })
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

    const map = req.params.map_id;
    const user = req.session.user_id;

    Promise.all([dbUserFns.getUserById(db, user), dbFns.deleteMap(db, map, user)])
    .then(res.redirect("/maps"))
    .catch(error => {
      res.status(500).json(error);
    })
  });

  return router;
};
