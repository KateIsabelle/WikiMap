const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // set cookie in 'login/:user_id'
  router.get('/:id', (req, res) => {
    console.log("before.....................", req.params.id)
    req.session.user_id = req.params.id;

    console.log("after................", req.session.user_id)
    res.redirect('/maps');
  });
  return router;
};


