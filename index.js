require('dotenv').config();
require('./dbconfig');
const express = require('express');
const authentication_route = require('./src/routes/authentication.route');
const notebook_route = require('./src/routes/notebook.route');
const notebook_page_route = require('./src/routes/notebook_page.route');
const trip_route = require('./src/routes/trip.route');
const boat_route = require('./src/routes/boat.route');
const reservation_route = require('./src/routes/reservation.route');
const user_route = require('./src/routes/user.route');

var path = require('path');
const oas3Tools = require('oas3-tools');


const app = express();

app.use(express.json());


//swaggerRouter configuration
var options = {
  routing: {
      controllers: path.join(__dirname, './src/controllers')
  },
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
app.use(expressAppConfig.getApp());

app.use('/auth', authentication_route);
app.use('/notebook', notebook_route);
app.use('/notebook_page', notebook_page_route);
app.use('/trip', trip_route);
app.use('/boat', boat_route);
app.use('/reservation', reservation_route);
app.use('/user', user_route);

app.get('/', (req, res) => {
  res.send('Fisher fans API')
})

// app.listen(process.env.PORT, () => {
//   console.log(`Server Started at ${process.env.PORT}`);
// });

// server running status
app.listen(process.env.PORT, () => {
  console.log(`Your server is listening on port ${process.env.PORT} (http://localhost:${process.env.PORT})`);
  console.log(`Swagger-ui is available on http://localhost:${process.env.PORT}/docs`);

});

module.exports = app;