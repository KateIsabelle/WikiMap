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
        description: maps.description,
        latitude: maps.latitude,
        longitude: maps.longitude,
        zoom: maps.zoom
      };
    })

    .catch(err => {
      console.log(err);
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
      return data.rows;
    })
    .catch(err => {
      console.log(err);
    });
};

const getAllMaps = function (db, maps, limit = 10) {
  let queryString = `SELECT maps.* FROM maps
    JOIN users ON users.id = maps.user_id
    JOIN favourites ON maps.id = favourites.map_id
    WHERE TRUE;`;

  const queryParams = [];

  if (maps.title) {
    queryParams.push(`%${maps.title}%`);
    query += `AND city LIKE $${queryParams.length} `;
  }
  if (maps.user_id) {
    queryParams.push(maps.user_id);
    queryString += `AND maps.user_id = $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `
        ORDER BY created_at
        LIMIT $${queryParams.length};
        `;
  return db
    .query(queryString, queryParams)
    .then((res) => res.rows)
    .catch((error) => console.log(error));

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
  getAllMaps
};
