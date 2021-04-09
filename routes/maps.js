const { Template } = require("ejs");
const express = require("express");
const router = express.Router();
const dbFns = require('../queries/maps_db');
const pinFns = require('../queries/pins_db');

const dbUserFns = require("../queries/users_db");



module.exports = (db, apiKey) => {

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

            apiKey: apiKey,
            user_id: req.session.user_id

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
        lat: req.body.coords.lat,
        lng: req.body.coords.lng,
        title: req.body.pinInfo.title,
        description: req.body.pinInfo.description,
        photo_url: req.body.pinInfo.photo_url
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

    // // POST /maps/:map_id/delete -- Delete a map
    // router.post("/:map_id/delete", (req, res) => {

    //   const map_id = req.params.id;

    //   const user = req.session.user_id;

    //   Promise.all([
    //     dbUserFns.getUserById(db, user),
    //     dbFns.deleteMap(db, map_id, user),
    //   ])
    //     .then(res.redirect("/maps"))
    //     .catch((error) => {
    //       res.status(500).json(error);
    //     });
    // });

    // // POST /maps/:map_id/edit -- Edit a map
    // router.post("/:map_id/edit", (req, res) => {
    //   console.log("==> POST /maps/:map_id/edit -- Edit a map");


    // });
      // POST /maps/:map_id/delete -- Delete a map
  router.post("/:map_id/delete", (req, res) => {
    const map = req.params.map_id;
    const user = req.session.user_id;

    Promise.all([
      dbUserFns.getUserById(db, user),
      dbFns.deleteMap(db, map, user),
    ])
      .then(res.redirect("/maps"))
      .catch((error) => {
        res.status(500).json(error);
      });
  });
    return router;

  };

  // POST /maps/:map_id/edit -- Edit a map
  router.post("/:map_id/edit", (req, res) => {
    console.log("==> POST /maps/:map_id/edit -- Edit a map");
  });
