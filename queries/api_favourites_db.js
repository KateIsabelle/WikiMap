
const getMyFavourites = (db, userId, mapId) => {
  //write query for favourites where userId is set in cookie
  const query = `
  SELECT * FROM favourites
  WHERE user_id = ${userId}
  AND map_id = ${mapId}
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

const saveMyFavourite = (db, userId, mapId) => {

 const query = `
    INSERT INTO favourites (map_id, user_id)
    VALUES (${mapId}, ${userId});
  `;
  return db
    .query(query)

    .then(data => {
      const favourite = data.rows;
      return favourite;
    })
}

const deleteMyFavourite = (db, userId, mapId) => {

  const query = `
  DELETE FROM favourites
  WHERE map_id = ${mapId}
  AND user_id = ${userId}
   ;`;
   return db
     .query(query)

     .then(data => {
       const favourite = data.rows;
       // const mapIds = favourites.map(fav => fav.map_id)
       return favourite;
     })
 }


module.exports = { getMyFavourites, saveMyFavourite, deleteMyFavourite }
