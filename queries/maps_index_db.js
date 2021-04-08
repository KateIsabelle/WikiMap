const apiKey = process.env.API_KEY;

//Query maps table and accompanying pin info
const getFirstMaps = (db, userId) => {
  //write query for map data and pins associated with each map
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
      //execute function to get favourites, which is asynchronous and returns a promise
      return getMyFavourites(db, userId)

      //once we have favourites data, then we can check in mapsArray loop if map is inside of favData array
      .then((favData) => {
        for (let map of mapsArray) {
          //if map.markers is null, set markersQuery key to equal empty string
          //and map.markers to equal empty array
          if (!map.markers[0]) {
            map.markersQuery = "";
            map.markers = [];
            //else, give markersQuery key the value of a string to be passed into src in ejs template
          } else {
            map.markersQuery = map.markers.map((m) => `markers=${m}`).join(`&`) + "&";
          }
          //make myFavourites key in map object and set boolean value (did this user like this map?)
          map.myFavourites = favData.includes(map.id);
        }
        return mapsArray;

      })


    })
};

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



module.exports = { getFirstMaps }


