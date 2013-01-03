$(document).ready(function() {
	/* attach event listeners to buttons */
  var el = document.getElementById("btn1");   
	el.addEventListener("click", getImages, false); 

  var base = localStorage.getItem("base");
  var authToken = localStorage.getItem("authToken");
  var username = localStorage.getItem("username");

  // populate the dropdown with a list of albums
  sendRequest('GET', base + 'account/' + username + '/albums/', makeAlbums); 

/* create a dropdown list of albums */
function makeAlbums(resText) {
  var res = JSON.parse(resText);
  var data = res.data;

  /* create the dropdown */
  for(var i in data) {
    $('<option />', 
      { value: data[i].id, 
        text: data[i].title
      }).appendTo('#album-dropdown');
  }
}

/* get the images based on the dropdown */
function getImages() {
  var req = new XMLHttpRequest();
  var id = $('#album-dropdown').val();
  $('.result').empty();

  if (id == "all") {
    /* get image count */
    var numPages;
    sendRequest('GET', base + 'account/' + username + '/images/count', function(data) {
        var count = JSON.parse(data).data;
        numPages = parseInt(count/50, 10);

        // request each page to get all the images
        for (var i=0;i<=numPages;i++) {
          sendRequest('GET', base + 'account/' + username + '/images/' + i, createImages);
        }
      })
  }
  else {
    /* get the images for the specific album */
    sendRequest('GET', base + 'album/' + id + '/images', createImages);
  }
}

/* create  image from the resonse JSON array */
function createImages(data) {
  var res = JSON.parse(data);
  var data = res.data;

  /* create the images */
    for(var i in data) {
      var anchor = $('<a />', 
        {
          href: data[i].link 
        });
      $('<img />', 
        { 
          src: changeToThumb(data[i].link)
        }).appendTo(anchor);
      anchor.appendTo($('.result'));
  }
}

/* changes link to a thumbnail */
function changeToThumb(link) {
  var n=link.split(".");
  n[n.length - 2] = n[n.length - 2] + "b";
  return n.join('.');
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
