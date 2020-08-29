
function setup() {


}

function draw() {


}

function keyPressed() {
	if (key == 'b') {
		window.open(document.getElementById("url-input").value, "_blank");
	}
	if (key == 's') {
		window.open(document.getElementById("url-input").value, "_self");
	}
	if (key == 'p') {
		window.open(document.getElementById("url-input").value, "_parent");
	}
	if (key == 't') {
		window.open(document.getElementById("url-input").value, "_top");
	}
}