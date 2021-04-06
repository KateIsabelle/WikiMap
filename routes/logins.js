const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // router.get('/:user_id', (req, res) => {
  //   console.log('==> GET /logins/:id -- Display landing page')
  //   const userId = req.params.user_id;
  //   req.session.user_id = userId;
  //   res.redirect('/')
  // });
  // router.get('/login/:id', (req, res) => {
  //   req.session.user_id = req.params.id;
  //   res.redirect('/');
  // });
  return router;
};


