// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require("cookie-session");

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const apiKey = require('./lib/api.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(
  cookieSession({
    name: "session",
    keys: ["user_id"],
  })
);
// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const mapsRoutes = require("./routes/maps");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");
//K
const mapIndexRoutes = require('./routes/maps_index');
const userFavouritesRoutes = require('./routes/favourites');
const createMapRoutes = require('./routes/create');
const apiRoutes = require('./routes/api_favourites');




// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(db, apiKey));
app.use("/maps", mapsRoutes(db, apiKey));
app.use("/login", loginRoutes(db));
app.use("/logout", logoutRoutes(db));
//K
app.use("/maps", mapIndexRoutes(db, apiKey));
app.use("/favourites", userFavouritesRoutes(db, apiKey));
app.use("/create", createMapRoutes(db, apiKey));
app.use("/api", apiRoutes(db));





// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
