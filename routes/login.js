const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // set cookie in 'login/:user_id'
  router.get('/', (req, res) => {
    req.session.user_id = 1;
    res.redirect('/maps');
  });
  return router;
};


