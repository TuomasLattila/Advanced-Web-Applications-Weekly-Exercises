var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const bookRouter = require('./routes/book')

var app = express();

//Database setup:
const mongodb = 'mongodb://127.0.0.1:27017/testdb';
mongoose.connect(mongodb);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to MongoDB"))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//cors setup:
if (process.env.NODE_ENV === "development") {
  var corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
  }
  app.use(cors(corsOptions))
}

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/book', bookRouter)

module.exports = app;
