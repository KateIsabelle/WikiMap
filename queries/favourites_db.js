module.exports = (db) => {
  const addFavourite = function (user_id, map_id) {
    const query = `
    INSERT INTO favourites (user_id, map_id)
    VALUES ($1, $2)
    RETURNING *;
    ;`;
    const values = [user_id, map_id];
    return db
      .query(query, values)
      .then((res) => res.json(res.rows))
      .catch((error) => console.log(error));
  };
};
