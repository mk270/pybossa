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

  function _presentTask(task, deferred, module, short_name) {
    if ( !$.isEmptyObject(task) ) {
        culttag.loadUserProgress(module, short_name);
        $('#photo-link').html('').append(task.info.image);
        $("#photo-link").attr("href", task.info.link);
        $("#question").html(task.info.question);
        $('#task-id').html(task.id);
        $('.btn-answer').off('click').on('click', function(evt) {
            var answer = $(evt.target).attr("value");
            if (typeof answer != 'undefined') {
                //console.log(answer);
                module.saveTask(task.id, answer).done(function() {
                    deferred.resolve();
                });
                $("#loading").fadeIn(500);
                if ($("#disqus_thread").is(":visible")) {
                    $('#disqus_thread').toggle();
                    $('.btn-disqus').toggle();
                }
            }
            else {
                $("#error").show();
            }
        });
        $("#loading").hide();
    }
    else {
        $(".skeleton").hide();
        $("#loading").hide();
        $("#finish").fadeIn(500);
    }
  };

  function presentTask(module, short_name) {
	return function(task, deferred) {
      return _presentTask(task, deferred, module, short_name);
	};
  };

  culttag.loadUserProgress = function(module, short_name) {
	return loadUserProgress(module, short_name);
  };

  culttag.taskLoaded = function(task, deferred) {
	return taskLoaded(task, deferred);
  };

  culttag.presentTask = function(module, short_name) {
	return presentTask(module, short_name);
  };

} ( window.culttag = window.culttag || {}, jQuery ));