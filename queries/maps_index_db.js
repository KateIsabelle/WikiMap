const getFirstMaps = (db) => {
  const query = `
    SELECT maps.*, users.name as user_name
    FROM maps
    JOIN users ON user_id = users.id
    WHERE users.id = user_id
    ORDER BY id DESC
    LIMIT 4
    ;`;
  return db
    .query(query)
    .then(data => {
      const mapsArray = data.rows;
      // const newMaps = {};
      // for (let map of mapsArray) {
      //   const m = {
      //   id: map.id,
      //   title: map.title,
      //   image: map.image,
      //   latitude: map.latitude,
      //   longitude: map.longitude,
      //   zoom: map.zoom,
      //   user_name: map.user_name
      //   };
      // newMaps[map.id] = m;
      // }

      return {maps: mapsArray}
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
};

module.exports = { getFirstMaps }


