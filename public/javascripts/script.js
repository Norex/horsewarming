(function($) {
  $(document).ready(function() {
    $('#keyword-form').submit(function(){
      $.post("", { keyword: $('#keyword').val(), time: "2pm" } );
      $('#keyword').val('');
      return false;
    });

    processTweet = function(data){
    	picTwitter = scrapePicTwitter(data);
    	$('#tweets').prepend('<div class="row"><div class="span12"><blockquote class="tweet"><img src="' + data.user.profile_image_url + '"/><p>' + data.text + '</p><small>' + data.user.screen_name + '</small></p>'+picTwitter+'</blockquote></div></div>');
    }

    scrapePicTwitter = function(data){
    	var output = '';
    	try{
    		for(var i=0; i<data.entities.media.length; i++){
    			output += '<img class="picture pic-twitter" src="' + data.entities.media[i].media_url + '" />';
    		}
    	}catch(e){

    	}
    	return output;
    }
  });
})(jQuery);