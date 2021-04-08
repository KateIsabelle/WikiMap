const { Template } = require("ejs");
const express = require("express");
const router = express.Router();
// const dbFns = require("../queries/maps_db");
const { getUserById } = require("../queries/users_db");
const { createMap } = require('../queries/create_db')
// const { getMapById, getPins } = require("../queries/maps_db");

module.exports = (db, apiKey) => {

  // get /create endpoint
  router.get("/", (req, res) => {
    const userId = req.session.user_id;
    getUserById(db, userId)
      .then((user) => {
        const templateVars = {
          user
          //   mapId: req.body.id,
          //   title: req.body.title,
          //   description: req.body.description,
          //   zoom: req.body.zoom,
          //   latitude: req.body.latitude,
          //   longitude: req.body.longitude,
        };
        res.render("create", templateVars);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });

  //Create a new map
  router.post("/", (req, res) => {

    const user = req.session.user_id;

    const maps = {
      user: user,
      title: req.body.title,
      description: req.body.description,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    };
    console.log("CREATE.JS is being reached:", maps.latitude, maps.longitude)

    Promise.all([getUserById(db, user), createMap(db, maps)])
      .then(([user, map]) => {
        res.redirect(`/maps/${map.id}`);
      })
      .catch((error) => {
        console.log("error ==>", error);
        res.status(500).json(error);
      });


  });



  return router;
}


