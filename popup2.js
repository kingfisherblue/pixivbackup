var req = new XMLHttpRequest();
req.open(
    "GET",
    "https://api.imgur.com/oauth2/authorize?" +
        "client_id=d3b298c7195beef&" +
        "redirect_uri=popup.html&" +
        "response_type=token",
    true);
req.onload = showPhotos;
req.send();

function showPhotos() {
  if (req.status==200) {
    var frame= document.getElementById('authFrame');
    var doc= frame.contentDocument? frame.contentDocument : frame.contentWindow.document; // IE compatibility
    doc.open('text/html');
    doc.write(req);
    doc.close();
  } else{
    console.log(req.respnseText);
  }

  // var photos = req.responseXML.getElementsByTagName("photo");

  // for (var i = 0, photo; photo = photos[i]; i++) {
  //   var img = document.createElement("image");
  //   img.src = constructImageURL(photo);
  //   document.body.appendChild(img);
  // }
}

// See: http://www.flickr.com/services/api/misc.urls.html
function constructImageURL(photo) {
  return "http://farm" + photo.getAttribute("farm") +
      ".static.flickr.com/" + photo.getAttribute("server") +
      "/" + photo.getAttribute("id") +
      "_" + photo.getAttribute("secret") +
      "_s.jpg";
}

