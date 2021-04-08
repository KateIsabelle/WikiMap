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

const getPinsForMaps = (db, user_id) => {
  const query = `
    SELECT array_agg(pins.lat || ',' || pins.lng) as markers FROM pins
    JOIN maps ON pins.map_id = maps.id
    JOIN users ON maps.user_id = users.id
    WHERE user_id = $1
    ;`;
  return db.query(query, [user_id]).then((data) => {
    const mapsArray = data.rows;
    for (let map of mapsArray) {
      if (!map.markers[0]) {
        map.markersQuery = "";
        map.markers = [];
      } else {
        map.markersQuery =
          map.markers.map((m) => `markers=${m}`).join(`&`) + "&";
          console.log("map.markersQuery ==>", map.markersQuery )
      }
    }
    console.log("mapsArray==>", mapsArray)
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
  console.log("parameters ==>", parameters);
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
  console.log("values ==>", values);
  return db.query(query, values).then((response) => response.rows[0]);
};

const deleteMap = function (db, map_id, user_id) {
  console.log("map_id==>", map_id);
  console.log("user_id ==>", user_id);
  const query = `
  DELETE FROM maps
  WHERE id = $1 AND user_id = $2
  ;`;
  const values = [map_id, user_id];

  return db.query(query, values);
};

const getMyFavourites = (db, user_id) => {
  //write query for favourites where userId is set in cookie
  const query = `
  SELECT * FROM favourites
  WHERE user_id = $1
  ;`;
  return (
    db
      .query(query, [user_id])
      //take only map id out of data.rows objects, put into array, and return array of map id's which are liked by this user
      //return a promise
      .then((data) => {
        const favourites = data.rows;
        const mapIds = favourites.map((fav) => fav.map_id);
        return mapIds;
      })
  );
};

module.exports = {
  getMapById,
  getPins,
  getUserMaps,
  createMap,
  deleteMap,
  getPinsForMaps,
};
