var createError = require('http-errors');
var express = require('express');
var mysql = require('mysql');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var prototypeRouter = require('./routes/prototype');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); // connects front end to back


/* These are basically forwarders - when going to localhost/{whatever is in quotes there} 
it will show the files in the routes folder - ex: localhost/ goes to index router, loads index.js */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/prototype', prototypeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// database connection
/* var connection = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "password",
    database: "SocialMedia",
    port: "3306"
})

connection.connect((err) => {
    if(err){
        throw err
    } else {
        console.log("connected")
    }
})
connection.query */



module.exports = app;
