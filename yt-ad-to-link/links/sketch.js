

function setup() {
	database.on("/unlistedAdLinks", () => {
		database.read("/unlistedAdLinks", (value) => {
			keys = Object.keys(value)
			document.querySelector("#num-of-links").innerHTML = keys.length;
			document.querySelector("#urls").innerHTML = "";
			for (let key of keys) {
				document.querySelector("#urls").innerHTML +=
					`<li> <span class="url"><a href="https://www.youtube.com/watch?v=${eval(`value["${key}"].id`)}"> youtu.be/${eval(`value["${key}"].id`)}</a></span> ${""
					}&#9472 <span class="title">${eval(`value["${key}"].title`)}</span></li>`
			}
			document.querySelector("#loading-paragraph").hidden = true;
		});
	})
}