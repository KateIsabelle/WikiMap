/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getUsers } = require('../queries/users_db');

module.exports = (db) => {

  // GET /users/
  router.get('/', (req, res) => {
    // console.log('db =',db);
    getUsers(db)
      .then((users) => {
        res.json(users);
      });
  });

  // GET /users/:id -- Display user profile
  router.get('/:id', (req, res) => {
    console.log('==> GET /users/:id -- Display user profile');
  });

  return router;
};
