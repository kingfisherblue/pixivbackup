//function requestToken() {
	var extensionID = "lnklnmhkiobebdniikacikhcjlgicgbg"; //"gppllppmgjojioadfhcddpedoaabedjc"; //bahfdnjfgdohaibldgklbgodiijjnlfg";
	var redirectURL = "chrome-extension://" + extensionID + "/main.html"
	var imgurID =  "77b33c9a6022e74"; //"6a2b63072700671"; //77b33c9a6022e74"; // "87c8b4d9e3ee228";
	var authURL = "https://api.imgur.com/oauth2/" +
				  "authorize?client_id=" + imgurID + "&" + 
			  	  "redirect_uri=" + redirectURL + "&" +
			 	  "response_type=token";

chrome.browserAction.onClicked.addListener(function(tab) {
  	chrome.tabs.create({"url":authURL, "selected":true});
})
