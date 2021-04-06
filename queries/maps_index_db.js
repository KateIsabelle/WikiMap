const apiKey = process.env.API_KEY;

//Query maps table and accompanying pin info
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

module.exports = { getFirstMaps }


