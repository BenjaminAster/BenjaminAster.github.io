

let texts = {
	en: {
		mainHeading: "This is the main heading.",
		firstParagraph: "this is the first paragraph."
	},
	de: {
		mainHeading: "Das ist die Hauptüberschrift.",
		firstParagraph: "Das ist der Erste Absatz."
	}
};


let language = "de";

if (language == "en") {
	mainHeading.innerHTML = texts.en.mainHeading;
	firstParagraph.innerHTML = texts.en.firstParagraph;
} else if (language == "de") {
	mainHeading.innerHTML = texts.de.mainHeading;
	firstParagraph.innerHTML = texts.de.firstParagraph;
}