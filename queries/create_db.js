// Query maps table by ID
const getMapById = (db, map_id) => {
  const query = `
    SELECT * FROM maps
    WHERE id = $1
    ;`;
  return db
    .query(query, [map_id])
    .then((data) => {
      const maps = data.rows[0];
      return {
        id: maps.id,
        title: maps.title,
        latitude: maps.latitude,
        longitude: maps.longitude,
        zoom: maps.zoom,
      };
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

// Display Pins by map_id
const getPins = (db, map_id) => {
  const query = `
    SELECT * FROM pins
    WHERE map_id = $1
    ;`;
  return db
    .query(query, [map_id])
    .then((data) => {
      console.log("display data.rows", data.rows);
      return data.rows;
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
