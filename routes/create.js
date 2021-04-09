const { Template } = require("ejs");
const express = require("express");
const router = express.Router();
const { getUserById } = require("../queries/users_db");
const { createMap } = require('../queries/create_db')
const dbFns = require("../queries/maps_db");
const dbUserFns = require("../queries/users_db");

module.exports = (db, apiKey) => {

  // get /create endpoint
  router.get("/", (req, res) => {
    const userId = req.session.user_id;
    getUserById(db, userId)
      .then((user) => {
        const templateVars = {
          user
        };
        res.render("create", templateVars);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });

//Kate's changes. We need to see what is missing
  //Create a new map
  router.post("/", (req, res) => {

    const user = req.session.user_id;

    const maps = {
      user: user,
      title: req.body.title,
      description: req.body["map-description"],
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    };
    Promise.all([getUserById(db, user), createMap(db, maps)])
      .then(([user, map]) => {
        res.redirect(`/maps/${map.id}`);
      })
      .catch((error) => {
        console.log("error ==>", error);
        res.status(500).json(error);
      });
  });
  //My original.
  // router.post("/", (req, res) => {
  //   const mapId = req.body.id;
  //   const user = req.session.user_id;

  //   const maps = {
  //     mapId: req.body.id,
  //     user: user,
  //     title: req.body.title,
  //     description: req.body.description,
  //     latitude: req.body.latitude,
  //     longitude: req.body.longitude,
  //   };

  //   Promise.all([dbUserFns.getUserById(db, user), dbFns.createMap(db, maps)])
  //     .then(([user, maps]) => {
  //       const templateVars = { user, map: maps, pins: [] };
  //       res.render("maps_show", templateVars);
  //     })
  //     .catch((error) => {
  //       console.log("error ==>", error);
  //       res.status(500).json(error);
  //     });
  // });
  return router;
}


