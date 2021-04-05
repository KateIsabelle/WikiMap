module.exports = (db) => {

  const getUserMaps = function (user_id) {
    const query = `
    SELECT * FROM maps
    WHERE map_id = 1
    ;`;
    return db
    .query(query, [user_id])
    .then(res => res.rows)
    .catch((error) => console.log(error));
  }

};
