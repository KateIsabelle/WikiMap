const apiKey = process.env.API_KEY;

//Query maps table and accompanying pin info
const getFirstMaps = (db, userId) => {
  const query = `
      SELECT maps.*, users.name as user_name, array_agg(pins.lat || ',' || pins.lng) as markers
       FROM maps
       JOIN users ON user_id = users.id
       LEFT JOIN pins ON pins.map_id = maps.id
       GROUP BY maps.id, users.name
       ORDER BY id DESC
       LIMIT 4
    ;`;
  return db
    .query(query)
    .then(data => {
      const mapsArray = data.rows;
      console.log("MAPS ARRAY", mapsArray);
      //executes other function which is asynchronous and returns a promise
      return getMyFavourites(db, userId)
      //wait until we have the favourites data
      //to check if looped map is inside of favData
      .then((favData) => {
        console.log("FAV DATA: ", favData)
        for (let map of mapsArray) {
          if (!map.markers[0]) {
            map.markersQuery = "";
            map.markers = [];
          } else {
            map.markersQuery = map.markers.map((m) => `markers=${m}`).join(`&`) + "&";
          }
          map.myFavourites = favData.includes(map.id)
        }
        console.log("Mutated maps array", mapsArray)
        return mapsArray;

      })


    })
};

const getMyFavourites = (db, userId) => {
  const query = `
  SELECT * FROM favourites
  WHERE user_id = ${userId}
  ;`;
  return db
  .query(query)
  .then(data => {
    const favourites = data.rows;
    const mapIds = favourites.map(fav => fav.map_id)
    return mapIds;
  })
}



module.exports = { getFirstMaps }


