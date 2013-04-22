var Instagram = require('instagram-node-lib'),
    nconf = require('nconf');

nconf.argv()
     .env()
     .file({ file: './config.json' });

Instagram.set('client_id', nconf.get('INSTAGRAM_CLIENT_ID'));
Instagram.set('client_secret', nconf.get('INSTAGRAM_CLIENT_SECRET'));
Instagram.set('callback_url', 'http://horsewarming.jit.su/subscribe');
Instagram.set('maxSockets', 10);

var instagramStream = false,
    currentlySelectedKeyword = false;

module.exports.run = function(keyword, io) {
  Instagram.subscriptions.subscribe({ object: 'tag', object_id: 'blue' });
  io.sockets.emit('instagram_images', Instagram.subscriptions.list());
  //io.sockets.emit('instagram_images', things);

  // if (tweetStream)
  //   tweetStream.stop();

  // currentlySelectedKeyword = keyword;
  // io.sockets.emit('switched_keyword', keyword);

  // tweetStream = twit.stream('statuses/filter', { track: keyword });
  // tweetStream.on('tweet', function (tweet) {
  //   io.sockets.emit('twitter', tweet);
  // });

  // tweetStream.on('limit', function (limitMessage) {
  //   console.log('Limited by Twitter streaming API');
  // });

  // tweetStream.on('disconnect', function (disconnectMessage) {
  //   console.log('Disconnected: ' + disconnectMessage);
  // });

  // tweetStream.on('connect', function (request) {
  //   console.log('Connected to Twitter streaming API');
  // });

  // tweetStream.on('reconnect', function (request, response, connectInterval) {
  //   console.log('Reconnected to Twitter streaming API');
  // });

  //return keyword;
};

module.exports.subscribe = function(req, res) {
  Instagram.subscriptions.handshake(req, res); 
};

