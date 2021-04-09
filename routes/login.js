const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // set cookie in 'login/:user_id'
  router.get('/', (req, res) => {
<<<<<<< HEAD
    req.session.user_id = 1;
=======
    req.session.user_id = 2;
>>>>>>> add5f96fefea6bf1e29bed94e850c59604b30071
    res.redirect('/maps');
  });
  return router;
};


