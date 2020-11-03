

let userLang = navigator.language.toLowerCase();
if (userLang == "de" || userLang == "de-de" || userLang == "de-at" || userLang == "de-ch") {
	localStorage.setItem("lang", "de");
} else {
	localStorage.setItem("lang", "en");
}

function changeLang(data) {
	Object.keys(data).map(key => {
		if (data[key]["en"]) {
			$(`#${key}`).html(data[key][localStorage.getItem("lang")]);
		} else {
			changeLang(data[key]);
		}
	})
}

$.get("./langs.json", (data) => {
	changeLang(data);
});

