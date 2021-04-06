const express = require("express");
const router = express.Router();
const { getFirstMaps, getPins } = require('../queries/maps_index_db');


module.exports = (db, apiKey) => {

router.get('/', (req,res) => {
  console.log("==> GET /maps -- display recent maps")
  let templateVars = {};
  getFirstMaps(db)
  .then((maps) => {
    templateVars.maps = maps;
    // console.log("templateVars!!!!", templateVars);
    getPins(db)
    .then((pinsArray) => {
      templateVars.pins = pinsArray;
      templateVars.apiKey = apiKey;
      console.log('TemplateVars:', templateVars)
      res.render("index", templateVars);
    })
  })
  // .catch(err => {
  //   res
  //     .status(500)
  //     .json({ error: err.message });
  // });

});

return router

};

// <% let src = `https://maps.googleapis.com/maps/api/staticmap?center=${map.latitude},${map.longitude}&zoom=13&size=400x200&maptype=roadmap` %>
//       <% for(let pin of pins) { %>
//         <% if (pin.map_id === map.id) { %>
//           <% src += `&markers=color:blue%7Clabel:S%7C${map.latitude},${map.longitude}` %>
//           <% } %>
//           <% src += `&key=${apiKey}` %>



