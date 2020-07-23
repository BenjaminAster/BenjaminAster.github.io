
function setup() {


}

function draw() {


}

function keyPressed() {
	if (key == 'b') {
		open(document.getElementById("url-input").value, "_blank");
	}
	if (key == 's') {
		open(document.getElementById("url-input").value, "_self");
	}
	if (key == 'p') {
		open(document.getElementById("url-input").value, "_parent");
	}
	if (key == 't') {
		open(document.getElementById("url-input").value, "_top");
	}
}