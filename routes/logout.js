const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  app.post("/logout", (req, res) => {
    console.log("hello from logout")

    req.session["user_id"] = null;
    res.redirect("/maps");
  });

  return router;
};
