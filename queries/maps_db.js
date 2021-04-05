// const db = require("../server");

const getMapById = (db, map_id) => {
  const query = `
    SELECT * FROM maps
    WHERE id = $1
    ;`;
  return db
    .query(query, [map_id])
    .then(data => {
      const maps = data.rows[0];
      return {
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

module.exports = { getMapById };

// const getAllMaps = function (maps, limit = 10) {
//   let query = `SELECT maps.* FROM maps
//     JOIN users ON users.id = maps.user_id
//     JOIN favourites ON maps.id = favourites.map_id
//     WHERE TRUE;`;

//   const queryParams = [];

//   if (maps.title) {
//     queryParams.push(`%${maps.title}%`);
//     query += `AND city LIKE $${queryParams.length} `;
//   }
//   if (maps.user_id) {
//     queryParams.push(maps.user_id);
//     queryString += `AND maps.user_id = $${queryParams.length}`;
//   }

//   queryParams.push(limit);
//   queryString += `
//         ORDER BY created_at
//         LIMIT $${queryParams.length};
//         `;
//   return db
//     .query(query, queryParams)
//     .then((res) => res.rows)
//     .catch((error) => console.log(error));
// };

// const getUserMaps = function (user_id) {
//   const query = `
//     SELECT * FROM maps
//     WHERE user_id = $1
//     ;`;
//   return db
//     .query(query, [user_id])
//     .then((res) => res.rows)
//     .catch((error) => console.log(error));
// };

// const createMap = function (parameters) {
//   const query = `
//     INSERT INTO maps (title, description, image, zoom, latitude, longitude, created_at, user_id)
//     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
//     RETURNING *;
//     ;`;
//   const values = [
//     parameters.title,
//     parameters.description,
//     parameters.image,
//     parameters.zoom,
//     parameters.latitude,
//     parameters.longitude,
//     parameters.created_at,
//     parameters.user_id,
//   ];

//   return db
//     .query(query, values)
//     .then((response) => response.rows[0])
//     .catch((error) => console.log(error));
// };

// const deleteMap = function (map_id, user_id) {
//   const query = `
//     DELETE FROM maps
//     WHERE map_id = $1 AND user_id = $2
//     ;`;
//   const values = [map_id, user_id];

//   return db.query(query, values).catch((error) => console.log(error));

