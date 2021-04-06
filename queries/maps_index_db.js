const apiKey = process.env.API_KEY;

const getFirstMaps = (db) => {
  const query = `
  SELECT maps.*, users.name as user_name
       FROM maps
       JOIN users ON user_id = users.id
       WHERE users.id = user_id
       ORDER BY id DESC
       LIMIT 4
    ;`;
  return db
    .query(query)
    .then(data => {
      const mapsArray = data.rows;


      return mapsArray;

    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
};

// get pins
const getPins = (db) => {
  const query = `
    SELECT * FROM pins
    ;`;
  return db
    .query(query)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
};

module.exports = { getFirstMaps, getPins }


// const query = `
//     SELECT maps.*, users.name as user_name
//     FROM maps
//     JOIN users ON user_id = users.id
//     WHERE users.id = user_id
//     ORDER BY id DESC
//     LIMIT 4
//     ;`;
//   return db
//     .query(query)
//     .then(data => {
//       const mapsArray = data.rows;


//       return mapsArray;

//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
