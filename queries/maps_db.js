// Query maps table by ID
const getMapById = (db, map_id) => {
  console.log(map_id)
  const query = `
    SELECT * FROM maps
    WHERE id = $1
    ;`;
  return db
    .query(query, [map_id])
    .then((data) => {
      console.log(data)
      const maps = data.rows[0];
      return {
        id: maps.id,
        title: maps.title,
        latitude: maps.latitude,
        longitude: maps.longitude,
        zoom: maps.zoom,
      };
    })
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

const getMapsWithPins = (db, user_id) => {
  const query = `
  SELECT maps.*, users.name as user_name, array_agg(pins.lat || ',' || pins.lng) as markers
  FROM maps
  JOIN users ON user_id = users.id
  LEFT JOIN pins ON pins.map_id = maps.id
  GROUP BY maps.id, users.name
  ORDER BY maps.id DESC
  ;`;
  return db.query(query).then((data) => {
    const mapsArray = data.rows;
    for (let map of mapsArray) {
      //if map.markers is null, set markersQuery key to equal empty string
      //and map.markers to equal empty array
      if (!map.markers[0]) {
        map.markersQuery = "";
        map.markers = [];
        //else, give markersQuery key the value of a string to be passed into src in ejs template
      } else {
        map.markersQuery =
          map.markers.map((m) => `markers=${m}`).join(`&`) + "&";
      }
    }
    return mapsArray;
  });
};

const getUserMaps = function (db, user_id) {
  const query = `
  SELECT * FROM maps
  WHERE user_id = $1
  ;`;
  return db.query(query, [user_id]).then((res) => res.rows);
};

const createMap = function (db, parameters) {
  const query = `
  INSERT INTO maps (user_id, title, description, zoom, latitude, longitude)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;
  `;
  const values = [
    parameters.user,
    parameters.title,
    parameters.description,
    13,
    parameters.latitude,
    parameters.longitude,
  ];
  return db.query(query, values).then((response) => response.rows[0]);
};

const deleteMap = function (db, map_id, user_id) {
  const query = `
  DELETE FROM maps
  WHERE id = $1 AND user_id = $2
  ;`;
  const values = [map_id, user_id];
  return db.query(query, values);
};

module.exports = {
  getMapById,
  getPins,
  getUserMaps,
  createMap,
  deleteMap,
  getMapsWithPins,
};
