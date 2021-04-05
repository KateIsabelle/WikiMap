const getFirstMaps = (db) => {
  const query = `
    SELECT * FROM maps
    ORDER BY id DESC
    LIMIT 4
    ;`;
  return db
    .query(query)
    .then(data => {
      const maps = data.rows;
      const templateVars = {};
      for (let map of maps) {
        const m = {
        id: map.id,
        title: map.title,
        image: map.image,
        latitude: map.latitude,
        longitude: map.longitude,
        zoom: map.zoom
        };
        templateVars[map.id] = m;
      }

      return templateVars;
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
};

module.exports = { getFirstMaps }


