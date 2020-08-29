// ==UserScript==
// @name         SoundJackHelper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Additional features for SoundJack - currently lists country code for each user.
// @author       Ashley Gittins ash@ajg.net.au
// @match        https://dev.soundjack.eu/*/userList.php
// @do-not-grant        none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {

  // There's probably a neater way of doing this, say by triggering
  // each time we receive an update from the server, but for now,
  // we just check the list every 5 seconds for any users we haven't
  // tried to GeoLocate, and redraw the list when we get one.
  setInterval(function(){
      $.each(array, function( index, value){
      	if ( typeof array[index].country == "undefined" ){
      		array[index].country = '..';
      		$.getJSON('https://geoip-db.com/json/'+array[index].IP, function (data){
      			array[index].country = data.country_code;
      			array[index].name = '['+data.country_code+']'+array[index].name;
                drawUserList();
      		});
      	}
      })
  }, 5000);

})();
