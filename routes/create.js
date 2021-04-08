const { Template } = require("ejs");
const express = require("express");
const router = express.Router();
const dbFns = require("../queries/maps_db");
const dbUserFns = require("../queries/users_db");
const { getMapById, getPins } = require("../queries/maps_db");

module.exports = (db, apiKey) => {

    // GET /maps/:map_id  -- Display a map by id
    // router.get("/:map_id", (req, res) => {
    //   console.log("==> GET /maps/:map_id  -- Display a map by id");

    //   const mapID = req.params.map_id;
    //   let templateVars = {};
    //   getMapById(db, mapID).then((mapObj) => {
    //     templateVars.map = mapObj;
    //     getPins(db, mapID).then((pinsArray) => {
    //       templateVars.pins = pinsArray;
    //       templateVars.apiKey = apiKey;
    //       res.render("map_show", templateVars);
    //     });
    //   });
    // });

  //show form for map creation
  router.get("/", (req, res) => {
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
        res.render("2-create", templateVars);
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



  return router;
}
