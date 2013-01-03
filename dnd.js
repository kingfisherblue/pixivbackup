$(document).ready(function() {

  // Setup the dnd listeners.
  window.addEventListener("paste", pasteHandler);
  var dropZone = $('#drop_zone');
  // dropZone.addEventListener('dragover', handleDragOver, false);
  // dropZone.addEventListener('drop', handleFileSelect, false);

    // Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}
 
/* Handle paste events */
function pasteHandler(e) {
   if (e.clipboardData) {
      // Get the items from the clipboard
      var items = e.clipboardData.items;
      if (items) {
         // Loop through all items, looking for any kind of image
         for (var i = 0; i < items.length; i++) {
            if (items[i].type.indexOf("image") != -1) {
               var blob = items[i].getAsFile();
               // and use a URL or webkitURL (whichever is available to the browser)
               // to create a temporary URL to the object
               var URLObj = window.URL || window.webkitURL;
               var source = URLObj.createObjectURL(blob);

               // The URL can then be used as the source of an image
               createImage(source);
            }
         }
      }
   } else {
      // This is a cheap trick to make sure we read the data
      // AFTER it has been inserted.
      setTimeout(checkInput, 1);
   }
}
 
/* Parse the input in the paste catcher element */
function checkInput() {
   // Store the pasted content in a variable
   var child = dropZone.childNodes[0];
   dropZone.empty();
    
   if (child) {
      // If the user pastes an image, the src attribute
      // will represent the image as a base64 encoded string.
      if (child.tagName === "IMG") {
        $('#list').append(child.name);
        createImage(child.src);
      }
   }
}
 
/* Creates a new image from a given source */
function createImage(source) {
   var pastedImage = new Image();
   pastedImage.onload = function() {
      // You now have the image!
   }
   pastedImage.src = source;
   dropZone.append(pastedImage);
}

  // function handleFileSelect(evt) {
  //   evt.stopPropagation();
  //   evt.preventDefault();

  //   var files = evt.dataTransfer.files; // FileList object.

  //   // files is a FileList of File objects. List some properties.
  //   var output = [];
  //   for (var i = 0, f; f = files[i]; i++) {
  //     output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
  //                 f.size, ' bytes, last modified: ',
  //                 f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
  //                 '</li>');
  //   }
  //   document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  // }

  // function handleDragOver(evt) {
  //   evt.stopPropagation();
  //   evt.preventDefault();
  //   evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  // }




});