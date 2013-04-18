exports.index = function(req, res){
  var socketUrl = process.env.NODE_ENV ? process.env.SUBDOMAIN + '.nodejitsu.com' : 'http://localhost:' + (process.env.PORT || 3000);
  res.render('index', { socketUrl: socketUrl });
};