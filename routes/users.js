/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { request } = require("express");
const express = require("express");
const router = express.Router();
const { getUsers } = require("../queries/users_db");
const dbFns = require("../queries/maps_db");
const dbUserFns = require("../queries/users_db");


module.exports = (db, apiKey) => {
  // GET /users/
  router.get("/", (req, res) => {
    // console.log('db =',db);
    getUsers(db).then((users) => {
      res.json(users);
    });
  });

  // GET /users/:id -- Display user profile

  router.get("/:id", (req, res) => {
    console.log("==> GET /users/:id -- Display user profile");
    const user = req.params.id;
    req.session.user_id = req.params.id;
    Promise.all([dbUserFns.getUserById(db, user), dbFns.getUserMaps(db, user)])
      .then(([user, maps]) => {
        const templateVars = { user, maps, apiKey: process.env.API_KEY };
        res.render("user", templateVars);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });
  return router;
};
