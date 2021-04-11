## WikiMaps Project

WikiMaps is a static web application with dynamic features like 'favouriting' and adding pins onto maps. Non-logged-in users can browse maps that registered users created. Logged-in users can create maps, drop markers onto points of interest on map, and add descriptions/titles/photos for maps and markers. They can edit and delete maps, favourite maps, and view their profile where all of the maps that they created are displayed. 

Maps features are built using Google Maps Javascript API, Geolocation API, and Maps Static API

Built with HTML, EJS, CSS, JS, jQuery, Ajax, Express, Postgres

## Final Product
!["Screenshot of user favourites page, mobile view"]()
!["Screenshot of create map page, tablet view"]()

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- body-parser
- chalk
- cookie-session
- dotenv
- ejs
- express
- morgan 
- node-sass-middleware
- pg
- pg-native

## Getting Started

- Install dependencies: `npm i`
- Reset database: `npm run db:reset`
- Run the server: `npm run local`
- Visit `http://localhost:8080/`
