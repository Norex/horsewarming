var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , Twit = require('twit')
  , socketIo = require('socket.io');

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

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = socketIo.listen(server);

var twit = new Twit({
    consumer_key: '', 
    consumer_secret: '', 
    access_token: '',
    access_token_secret: ''
})

var tweetStream = twit.stream('statuses/filter', { track: 'cat' });
tweetStream.on('tweet', function (tweet) {
  io.sockets.emit('twitter', tweet);
});

tweetStream.on('limit', function (limitMessage) {
  console.log('Limited by Twitter streaming API');
})

tweetStream.on('disconnect', function (disconnectMessage) {
  console.log('Disconnected: ' + disconnectMessage);
})

tweetStream.on('connect', function (request) {
  console.log('Connected to Twitter streaming API');
})

tweetStream.on('reconnect', function (request, response, connectInterval) {
  console.log('Reconnected to Twitter streaming API');
})
