(function($) {
  $(document).ready(function() {
    var socket = io.connect('http://localhost:3000');
    socket.on('twitter', function(data) {
      $('#tweets').prepend('<div class="row"><div class="span12"><blockquote class="tweet"><img src="' + data.user.profile_image_url + '"/><p>' + data.text + '</p><small>' + data.user.screen_name + '</small></p></blockquote></div></div>');
      console.log(data);
    });
  });
})(jQuery);