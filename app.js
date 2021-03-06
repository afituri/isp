var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
// var redis = require("redis"),
//     client = redis.createClient();
// var RedisStore = require('connect-redis')(session);
var MongoDBStore = require('connect-mongodb-session')(session);

var routes = require('./routes/index');
var user = require('./routes/user');
var reseller = require('./routes/reseller');
var sProvider = require('./routes/sProvider');
var service = require('./routes/service');
var supplier = require('./routes/supplier');
var customer = require('./routes/customer');
var warehouse = require('./routes/warehouse');
var policy = require('./routes/policy');
var product = require('./routes/product');
var pages = require('./routes/pages');
var invoice = require('./routes/invoice');
var inStock = require('./routes/inStock');
var report = require('./routes/report');
var dollar = require('./routes/dollar');
var permission = require('./routes/permission');
var notice = require('./routes/notice');
var app = express();
var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/isp',
  collection: 'mySessions'
});

// Catch errors
store.on('error', function(error) {
  assert.ifError(error);
  assert.ok(false);
});
// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// app.use(session({store: new RedisStore({
//   client: client,
//   host:'127.0.0.1',
//   port:6379,
//   prefix:'sess'
// }), secret: 'SEKR37' }));
app.use(session(
  { store: store, 
    secret: 'SEKR37',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    resave: true,
    saveUninitialized: true 
  }
));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/user', user);
app.use('/reseller', reseller);
app.use('/sProvider', sProvider);
app.use('/service', service);
app.use('/supplier', supplier);
app.use('/customer', customer);
app.use('/warehouse', warehouse);
app.use('/policy', policy);
app.use('/pages', pages);
app.use('/product', product);
app.use('/invoice', invoice);
app.use('/instock', inStock);
app.use('/report', report);
app.use('/dollar', dollar);
app.use('/permission', permission);
app.use('/notice', notice);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
