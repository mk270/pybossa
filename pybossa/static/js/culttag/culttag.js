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

  culttag.loadUserProgress = function(module, short_name) {
	return loadUserProgress(module, short_name);
  };

} ( window.culttag = window.culttag || {}, jQuery ));