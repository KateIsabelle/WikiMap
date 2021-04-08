
const getMyFavourites = (db, userId) => {
  //write query for favourites where userId is set in cookie
  const query = `
  SELECT * FROM favourites
  WHERE user_id = ${userId}
  ;`;
  return db
  .query(query)
  //take only map id out of data.rows objects, put into array, and return array of map id's which are liked by this user
  //return a promise
  .then(data => {
    const favourites = data.rows;
    const mapIds = favourites.map(fav => fav.map_id)
    return mapIds;
  })
}

module.exports = { getMyFavourites }
