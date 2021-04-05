// Query maps table by ID
const getMapById = (db, map_id) => {
  const query = `
    SELECT * FROM maps
    WHERE id = $1
    ;`;
  return db
    .query(query, [map_id])
    .then(data => {
      const maps = data.rows[0];
      return  {
        id: maps.id,
        title: maps.title,
        image: maps.image,
        latitude: maps.latitude,
        longitude: maps.longitude,
        zoom: maps.zoom,
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
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
    .then(data => {
      console.log('display data.rows', data.rows);
      return data.rows;
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
};

const getAllMaps = function (maps, limit = 10) {
  let query = `SELECT maps.* FROM maps
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
    .query(query, queryParams)
    .then((res) => res.rows)
    .catch((error) => console.log(error));
};

const getUserMaps = function (user_id) {
  const query = `
    SELECT * FROM maps
    WHERE user_id = $1
    ;`;
  return db
    .query(query, [user_id])
    .then((res) => res.rows)
    .catch((error) => console.log(error));
};

const createMap = function (db, parameters) {
  console.log('parameters ==>', parameters);
  const query = `
    INSERT INTO maps (user_id, title, description, zoom, latitude, longitude)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `;
  const values = [
    parameters.user,
    parameters.title,
    parameters.description,
    parameters.zoom,
    parameters.latitude,
    parameters.longitude
  ];
  console.log('values ==>', values);
  return db
    .query(query, values)
    .then((response) => {
      console.log('response.rows[0] ===>', response.rows[0]);
      return response.rows[0];
    })
    .catch((error) => {
      console.log('error_message ===>', error);
    });
};

const deleteMap = function (map_id, user_id) {
  const query = `
    DELETE FROM maps
    WHERE map_id = $1 AND user_id = $2
    ;`;
  const values = [map_id, user_id];

  return db.query(query, values).catch((error) => console.log(error));
};

module.exports = { getMapById, getPins, getAllMaps, getUserMaps, createMap, deleteMap };
