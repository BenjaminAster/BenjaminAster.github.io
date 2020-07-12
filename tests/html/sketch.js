
let astleyUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";
let astleyUrl2 = "https://www.youtube.com/get_video_info?video_id=dQw4w9WgXcQ";
let astleyUrl3 = "https://youtu.be/dQw4w9WgXcQ";
let testUrl = "https://benjaminaster.github.io/tools/yt-ad-to-link/";
let testUrl2 = "https://google.com"


function httpGet(theUrl) {
	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, async = false);
	xmlHttp.send(null);
	return xmlHttp.responseText;
}

console.log(httpGet(testUrl2));

/*

<yt-formatted-string id="text" title="" class="style-scope ytd-channel-name" has-link-only_="">
	<a class="yt-simple-endpoint style-scope yt-formatted-string" spellcheck="false"
		href="/channel/UCuAXFkgsw1L7xaCfnd5JJOw" dir="auto">Official Rick Astley</a>
</yt-formatted-string>
*/

/*
const express = require('express');
const app = express();

// No CORS Headder set
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/message.json');
});

// CORS header `Access-Control-Allow-Origin` set to accept all
app.get('/allow-cors', function(request, response) {
  response.set('Access-Control-Allow-Origin', '*');
  response.sendFile(__dirname + '/message.json');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
*/

//https://web.dev/cross-origin-resource-sharing/