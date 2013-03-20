(function( culttag, $, undefined ) {

  function loadUserProgress(pybossa, short_name) {
    pybossa.userProgress(short_name).done(function(data){
      var pct = Math.round((data.done*100)/data.total);
      $("#progress").css("width", pct.toString() +"%");
      $("#progress").attr("title", pct.toString() + "% completed!");
      $("#progress").tooltip({'placement': 'left'}); 
      $("#total").text(data.total);
      $("#done").text(data.done);
    });
  };

  function taskLoaded(task, deferred) {
    if ( !$.isEmptyObject(task) ) {
      // load image from flickr
      var img = $('<img />');
      img.load(function() {
        // continue as soon as the image is loaded
        deferred.resolve(task);
      });
      img.attr('src', task.info.url_b).css('height', 460);
      img.addClass('img-polaroid');
      task.info.image = img;
    }
    else {
      deferred.resolve(task);
    };
  };

  culttag.loadUserProgress = function(module, short_name) {
	return loadUserProgress(module, short_name);
  };

  culttag.taskLoaded = function(task, deferred) {
	return taskLoaded(task, deferred);
  };

} ( window.culttag = window.culttag || {}, jQuery ));