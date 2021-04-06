const apiKey = process.env.API_KEY;

const getFirstMaps = (db) => {
  const query = `
      SELECT maps.*, users.name as user_name, array_agg(pins.lat || ',' || pins.lng) as markers
       FROM maps
       JOIN users ON user_id = users.id
       LEFT JOIN pins ON pins.map_id = maps.id
       GROUP BY maps.id, users.name
       ORDER BY id DESC
       LIMIT 4
    ;`;
  return db
    .query(query)
    .then(data => {
      const mapsArray = data.rows;
      for (let map of mapsArray) {
        if (!map.markers[0]) {
          map.markersQuery = "";
          map.markers = [];
        } else {
          map.markersQuery = map.markers.map((m) => `markers=${m}`).join(`&`) + "&";
        }
      }
      return mapsArray;

    })
};

// get pins
// const getPins = (db) => {
//   const query = `
//     SELECT * FROM pins
//     ;`;
//   return db
//     .query(query)
//     .then(data => {
//       return data.rows;
//     })
// };

module.exports = { getFirstMaps }


// const query = `
//     SELECT maps.*, users.name as user_name
//     FROM maps
//     JOIN users ON user_id = users.id
//     WHERE users.id = user_id
//     ORDER BY id DESC
//     LIMIT 4
//     ;`;
//   return db
//     .query(query)
//     .then(data => {
//       const mapsArray = data.rows;


//       return mapsArray;

//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });

// <% for(let pin of pins) { %>
//   <% if (pin.map_id === map.id) { %>
//     <% src += `&markers=color:blue%7Clabel:S%7C${map.latitude},${map.longitude}` %>
//     <% } %>
//     <% src += `&key=${apiKey}` %>
