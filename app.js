var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    twitter = require('./twitter'),
    instagram = require('./instagram'),
    socketIo = require('socket.io');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
// app.get('/subscribe', function(request, response){
//   instagram.subscribe(io, request, response);
// });
app.get('/subscribe', function(req, res) {
  instagram.subscribe(io, req, res);
});

app.post('/subscribe', function(req, res) {
  io.sockets.emit('instagram_images', 'nahhhh');
  io.sockets.emit('instagram_images', req);
  res.writeHead(200);
  res.end();
});

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


var io = socketIo.listen(server);

//twitter.run('cat', io);
instagram.run('cat', io);
