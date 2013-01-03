// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var token = "657b79bfbee4c7a0416bbfeb9e330f60c7600997";

var req = new XMLHttpRequest();
req.open(
    "GET",
    "https://api.imgur.com/3/account/f10r4/images.xml",
    true);
req.onload = showPhotos;
req.setRequestHeader("Authorization", "Bearer " + token);
req.send(null);

function showPhotos() {
  document.getElementById("myDiv").innerHTML=req.responseXML.getElementsByTagName("link")[0].nodeValue;
  
  // var photos = req.responseXML.getElementsByTagName("link");
  // for (var i = 0, photo; photo = photos[i]; i++) {
  //   var img = document.createElement("image");
  //   img.src = "http://i.imgur.com/oWhxN.gif";
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