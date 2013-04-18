(function($) {
  $(document).ready(function() {
    var socket = io.connect('http://localhost:3000');
    socket.on('twitter', function(data) {
      console.log(data);
    });
  });
})(jQuery);