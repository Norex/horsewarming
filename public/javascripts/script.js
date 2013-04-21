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
      picTwitter = scrapePicTwitter(data)
      twitpic = scrapeTwitPic(data);
      instagram = scrapeInstagram(data);
      $('#tweets').prepend('<div class="row"><div class="span12"><blockquote class="tweet">' + picTwitter + twitpic + instagram +'<img class="profile" src="' + data.user.profile_image_url + '"/><p>' + data.text.replace(new RegExp('(^|\\b)(' + keyword + ')(\\b|$)','ig'), '$1<strong>$2</strong>$3') + '</p><small>' + data.user.screen_name + '</small></p></blockquote></div></div>');
      $('#tweets > div').slice(50).remove();
    }

    var scrapePicTwitter = function(data) {
      var output = '';
      try{
        for(var i=0; i<data.entities.media.length; i++) {
          output += formatPhoto(data.entities.media[i].media_url + ':small', 'pic-twitter');
        }
      }
      catch(e){ }

      return output;
    }

    var scrapeTwitPic = function(data){
      var output = '';
      try{
        for(var i=0; i<data.entities.urls.length; i++){
          if(/twitpic\.com\//.test(data.entities.urls[i].display_url)){
            var pic = data.entities.urls[i].display_url.replace(/^twitpic\.com\/([a-zA-Z0-9]+)\/*.*/, "$1");
            output += formatPhoto('http://twitpic.com/show/thumb/' + pic, 'pic-twitpic');
          }
        }
      }
      catch(e){ }

      return output;
    }

    var scrapeInstagram = function(data){
      console.log(data);
      var output = '';
      try{
        for(var i=0; i<data.entities.urls.length; i++){
          if(/instagram\.com\//.test(data.entities.urls[i].display_url)){
            var pic = data.entities.urls[i].display_url.replace(/^instagram\.com\/p\/([a-zA-Z0-9]+)\/*.*/, "$1");
            output += formatPhoto('http://instagram.com/p/' + pic + '/media?size=t', 'pic-instagram');
          }
        }
      }
      catch(e){ }

      return output;
    }

    var formatPhoto = function(photo_url, html_class){
      return '<div class="picture-container"><img class="picture ' + html_class + '" src="' + photo_url + '" /></div>';
    }
  });
})(jQuery);