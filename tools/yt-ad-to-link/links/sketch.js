

function preload() {
	let links = loadStrings("unlisted-ad-links.txt");
}

function setup() {
	print(links);
	links = links.split("\n");
	console.log(links);
}