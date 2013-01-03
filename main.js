$(document).ready(function() {

	var base = "https://api.imgur.com/3/";
	var authToken = "";
	var username = "";

  var params = {}, 
  queryString = location.hash.substring(1),
  regex = /([^&=]+)=([^&]*)/g, m;
  
	// get the authentication token
  if (queryString.indexOf("token") != -1) {
  	authToken = getToken("access_token");
  	username = getToken("account_username");

    localStorage.setItem("base", base);
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("username", username);
  }

  /* set up the tabs */
  var tabsList = {
    Upload: "dnd.html",
    Settings: "settings.html",
    View: "auth.html" 
  }

  // if tabs have not been created yet
  if ($('.tab').length == 0) {
     $.each(tabsList,function(i,j){
      var tmp = $('<li><a href="#' + i + '" class="tab">'+ i +' </a></li>');
      tmp.find('a').data('page',j);
      $('ul.tabs').append(tmp);

      // create a new div for each tab
      $.get(j, function(page) 
      {
        $('<div />', 
        {
          html: page,
          id:   i
        }).appendTo($('.content'));
      })
    })
  }


  $('ul.tabs').each(function(){
    // For each set of tabs, we want to keep track of
    // which tab is active and it's associated content
    var $active, $content, $links = $(this).find('a');

    // If the location.hash matches one of the links, use that as the active tab.
    // If no match is found, use the first link as the initial active tab.
    $active = $($links[0]);
    $active.addClass('active');
    $content = $($active.attr('href'));

    // Hide the remaining content
    $links.not($active).each(function () {
        $($(this).attr('href')).hide();
    });

    // Bind the click event handler
    $(this).on('click', 'a', function(e){
        // Make the old tab inactive.
        $active.removeClass('active');
        $content.hide();

        // Update the variables with the new active link and content
        $active = $(this);
        $content = $($(this).attr('href'));

        // Make the tab active.
        $active.addClass('active');
        $content.show();

        // Prevent the anchor's default click action
        e.preventDefault();
    });
});

   /* Gets the authentication token from the response */
   function getToken(param) {
    var vars = queryString.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == param) {
       var value = decodeURIComponent(pair[1]);
       return value;
     }
   }
   console.log('Query variable %s not found', param);
 }

 function sendRequest(method, url, fn) {
  var req = new XMLHttpRequest();
  req.open(method, url, true);
  req.setRequestHeader("Authorization" , "Bearer " + authToken);
  console.log(req);
  req.onreadystatechange = function (e) {
    if (req.readyState == 4 && req.status == 200) {
      fn(req.responseText);
    } else if (req.status == 503) {
      alert('imgur is busy right now.');
      console.log(req.responseText);
    }
  } 
  req.send(null);  
}

});
