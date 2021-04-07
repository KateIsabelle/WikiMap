const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // set cookie in 'login/:user_id'
  router.get('/:id', (req, res) => {
    req.session.user_id = req.params.id;
    res.redirect('/maps');
  });
  return router;
};


