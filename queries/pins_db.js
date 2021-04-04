const db = require("../server");

const createPin = function (parameters) {
  let query = `
    INSERT INTO pins (map_id, lat, lng, title, photo_url, description)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `;
  const values = [
    parameters.map_id,
    parameters.lat,
    parameters.lng,
    parameters.title,
    parameters.photo_url,
    parameters.description,
  ];

  return db
    .query(query, values)
    .then((res) => res.json(res.rows))
    .catch((error) => console.log(error));
};

//maybe add user_id as well ?
const deletePin = function (pin_id, map_id) {
  const query = `
    DELETE FROM pins
    WHERE id = $1 AND map_id = $2
    ;`;
  const values = [pin_id, map_id];

  return db.query(query, values).catch((error) => console.log(error));
};

module.exports = { createPin, deletePin };
