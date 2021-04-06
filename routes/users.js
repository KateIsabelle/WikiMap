/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { request } = require('express');
const express = require('express');
const router  = express.Router();
const { getUsers } = require('../queries/users_db');
const dbFns = require('../queries/users_db');

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
    res.send('hello from user')
    // const user = req.session.user_id;
   // if (!user) {
    //   res.redirect("/maps");
    //   return;
    // }
    res.render('user');
  });

  return router;
};
