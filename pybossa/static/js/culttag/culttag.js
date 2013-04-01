(function( culttag, $, undefined ) {

  function getTags(task) {
    // return task.info.tag_names
    return [ [ { "label": "Yes", "value": "yes" },
               { "label": "No", "value": "no" },
               { "label": "Skip", "value": "skipped" } ] ];
  };

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

  var doneOnce = false;

  function addTagButtons(task) {
    if (doneOnce) {
      return;
    }
    doneOnce = true;
    var rows = getTags(task);
    var buttons_div = $("div#answer");
    //buttons_div.empty();
    for(var row = 0; row < rows.length; row++) {
      var new_row = $('<div class="row">');
      for(var col = 0; col < rows[row].length; col++) {
        new_row.append('<div class="span2"><button style="width: 100%" class="btn btn-answer" value="' + rows[row][col].value +
                       '">' + rows[row][col].label + '</button></div>');
      }
      buttons_div.append(new_row)
    }
  };

  function _taskLoaded(task, deferred) {
    if ( !$.isEmptyObject(task) ) {
	  var img_loaded = false;
	  var img2_loaded = false;

	  function both_loaded() {
		console.log(img_loaded, img2_loaded);
		if (img_loaded && img2_loaded) {
		  deferred.resolve(task);
		}
	  }

      var img = $('<img id="img1" />');
      img.load(function() {
		img_loaded = true;
		both_loaded();
      });
	  var img2 = $('<img id="img2" />');
	  img2.load(function() {
		img2_loaded = true;
		both_loaded();
	  });

      img.attr('src', task.info.url_b);
      img.addClass('img-polaroid');
      task.info.image = img;
      img2.attr('src', task.info.url_b2);
      img2.addClass('img-polaroid');
      task.info.image2 = img2;
      addTagButtons(task);
    }
    else {
      deferred.resolve(task);
    };
  };

  function _presentTask(task, deferred, module, short_name) {
    var answered_cb = function(evt) {
      var answer = $(evt.target).attr("value");
      if (typeof answer != 'undefined') {
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
    };

    if ( !$.isEmptyObject(task) ) {
      culttag.loadUserProgress(module, short_name);
      $('#photo-link').html('').append(task.info.image).append(task.info.image2);
      //$("#photo-link").attr("href", task.info.link);
      $("#question").html(task.info.question);
      $("#imgTitle").html(task.info.title);
      $("#imgCreator").html(task.info.creator);
      //$("#imgYear").html(task.info.date);
      
      $('#task-id').html(task.id);
      $('.btn-answer').off('click').on('click', answered_cb);
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
    return _taskLoaded(task, deferred);
  };

  culttag.presentTask = function(module, short_name) {
    return presentTask(module, short_name);
  };

} ( window.culttag = window.culttag || {}, jQuery ));