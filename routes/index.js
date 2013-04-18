exports.index = function(req, res){
  console.log('yaaa');
  var socketUrl = process.env.NODE_ENV ? process.env.SUBDOMAIN + '.nodejitsu.com' : 'http://localhost:' + (process.env.PORT || 3000);
  console.log(socketUrl);
  res.render('index', { socketUrl: socketUrl });
};