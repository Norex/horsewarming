var Twit = require('twit'),
		nconf = require('nconf');

nconf.argv()
     .env()
     .file({ file: './config.json' });

var twit = new Twit({
    consumer_key: nconf.get('twitter_consumer_key'),
    consumer_secret: nconf.get('twitter_consumer_secret'),
    access_token: nconf.get('twitter_access_token'),
    access_token_secret: nconf.get('twitter_access_token_secret')
});

var tweetStream = false;

module.exports.run = function(keyword, io) {
	if (tweetStream)
		tweetStream.stop();

	tweetStream = twit.stream('statuses/filter', { track: keyword });
	tweetStream.on('tweet', function (tweet) {
	  io.sockets.emit('twitter', tweet);
	});

	tweetStream.on('limit', function (limitMessage) {
	  console.log('Limited by Twitter streaming API');
	});

	tweetStream.on('disconnect', function (disconnectMessage) {
	  console.log('Disconnected: ' + disconnectMessage);
	});

	tweetStream.on('connect', function (request) {
	  console.log('Connected to Twitter streaming API');
	});

	tweetStream.on('reconnect', function (request, response, connectInterval) {
	  console.log('Reconnected to Twitter streaming API');
	});
}
