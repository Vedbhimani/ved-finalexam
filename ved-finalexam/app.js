var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var restaurantsRouter = require('./routes/api/restaurants');

const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('js-yaml');

const mongoose = require('mongoose');
const config = require('./config/config');

var app = express();

mongoose.connect(config.mongoConnectionString)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Failed to connect to MongoDB", err));

let openapiDoc;
try {
  const spec = fs.readFileSync('./openapi.yaml', 'utf8');
  openapiDoc = yaml.load(spec);
} catch (err) {
  console.error('Failed to load openapi.yaml', err);
}
if (openapiDoc) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDoc));
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use('/api/restaurants', restaurantsRouter);

module.exports = app;
