const createPin = function (db, pin) {
  let query = `
    INSERT INTO pins (map_id, lat, lng, title, photo_url, description)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `;
  const values = [
    pin.map_id,
    pin.lat,
    pin.lng,
    pin.title,
    pin.photo_url,
    pin.description,
  ];

  return db
    .query(query, values)
    .then((res) => {
      return res.rows;
    })
    .catch((error) => console.log(error));
};

//maybe add user_id as well ?
const deletePin = function (db, pin) {
  const query = `
    DELETE FROM pins
    WHERE id = $1 AND map_id = $2
    ;`;
  const values = [pin.pin_id, pin.map_id];

  return db.query(query, values).catch((error) => console.log(error));
};

module.exports = { createPin, deletePin };
