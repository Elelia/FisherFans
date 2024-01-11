require('dotenv').config();
require('./dbconfig');
// const https = require("https");
// const fs = require('fs');
const express = require('express');
const authentication_route = require('./src/routes/authentication.route');
const notebook_route = require('./src/routes/notebook.route');
const notebook_page_route = require('./src/routes/notebook_page.route');
const trip_route = require('./src/routes/trip.route');
const boat_route = require('./src/routes/boat.route');

const app = express();

app.use(express.json());
app.use('/auth', authentication_route);
app.use('/notebook', notebook_route);
app.use('/notebook_page', notebook_page_route);
app.use('/trip', trip_route);
app.use('/boat', boat_route);

app.post('/', (req, res) => {
  res.send('POST request received');
});

/*const server = https.createServer(app, {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
});

server.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});

module.exports = app;*/

app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});

module.exports = app;