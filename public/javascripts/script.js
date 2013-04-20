(function($) {
  $(document).ready(function() {
    // Hand keyword submission to changed tracked keyword.
    $('#keyword-form').submit(function(){
      $.post("", { keyword: $('#keyword').val(), time: "2pm" } );
      $('#keyword').val('');
      return false;
    });

    var socket = io.connect(window.location.hostname),
        keyword = '',
        tweets = [];

    socket.on('twitter', function(data) {
      processTweet(data);
    });

    socket.on('switched_keyword', function(data) {
      keyword = data;
      $('#alert-box').html('<h4>Now Streaming: ' + keyword);
      $('#alert-box').toggleClass("alert-info").toggleClass("alert-success");
    });

    var processTweet = function(data) {
       $('#tweets').prepend('<div class="row"><div class="span12"><blockquote class="tweet">' + scrapePicTwitter(data) + '<img class="profile" src="' + data.user.profile_image_url + '"/><p>' + data.text.replace(new RegExp('(^|\\b)(' + keyword + ')(\\b|$)','ig'), '$1<strong>$2</strong>$3') + '</p><small>' + data.user.screen_name + '</small></p></blockquote></div></div>');
      $('#tweets > div').slice(50).remove();
    }

    var scrapePicTwitter = function(data) {
      var output = '';
      try{
        for(var i=0; i<data.entities.media.length; i++) {
          output += '<div class="picture-container"><img class="picture pic-twitter" src="' + data.entities.media[i].media_url + ':small" /></div>';
        }
      }
      catch(e){ }

      return output;
    }
  });
})(jQuery);