(function($) {
  $(document).ready(function() {
    // Hand keyword submission to changed tracked keyword.
    $('#keyword-form').submit(function(){
      $.post("", { keyword: $('#keyword').val(), time: "2pm" } );
      $('#keyword').val('');
      return false;
    });

    var socket = io.connect(window.location.hostname);
    socket.on('twitter', function(data) {
      processTweet(data);
    });
    socket.on('switched_keyword', function(data) {
      $('#alert-box').html('<h4>Now Streaming: ' + data);
      $('#alert-box').toggleClass("alert-info").toggleClass("alert-success");
    });

    var processTweet = function(data) {
      picTwitter = scrapePicTwitter(data);
      $('#tweets').prepend('<div class="row"><div class="span12"><blockquote class="tweet"><img src="' + data.user.profile_image_url + '"/><p>' + data.text + '</p><small>' + data.user.screen_name + '</small></p>'+picTwitter+'</blockquote></div></div>');
    }

    var scrapePicTwitter = function(data) {
      var output = '';
      try{
        for(var i=0; i<data.entities.media.length; i++)
          output += '<img class="picture pic-twitter" src="' + data.entities.media[i].media_url + '" />';
      }
      catch(e){ }

      return output;
    }
  });
})(jQuery);