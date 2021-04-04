const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // GET /login/:id -- Display login page
  router.get('/:id', (req, res) => {
    console.log('==> GET /logins/:id -- Display login page')
  });
  return router;
};
