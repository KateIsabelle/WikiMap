const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/:id', (req, res) => {
    console.log('==> GET /logins/:id -- Display login page')
  });
  // router.get('/login/:id', (req, res) => {
  //   req.session.user_id = req.params.id;
  //   res.redirect('/');
  // });
  return router;
};
