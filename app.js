
/**
 * Module dependencies.
 */

var express = require('express'),
  //mongoose = require('mongoose'),
  routes = require('./routes'),
  dev = require('./routes/development')
  api = require('./routes/api');

var app = module.exports = express();

// Configuration

app.configure(function(){
  //mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/roomRes');
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/populate', dev.populate);
app.get('/partial/:name', routes.partial);

// JSON API

app.get('/api/name', api.name);
app.get('/api/rooms', api.rooms);
app.get('/api/reservations', api.reservations);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(process.env.PORT || 3000, function(){
  console.log("Server started");
});
