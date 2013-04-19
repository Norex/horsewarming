exports.index = function(req, res){
  console.log('yaaa');
  console.log(req.app.locals);
  var socketUrl = process.env.NODE_ENV ? process.env.SUBDOMAIN + '.jit.su' : 'http://localhost:' + (process.env.PORT || 3000);
  res.render('index', { socketUrl: socketUrl });
};