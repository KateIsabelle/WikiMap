
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

module.exports = { createMap }
