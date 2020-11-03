

function getLearnset() {
	let langs = [
		$(`.TermText.notranslate`)[0].className.substring(26, 28),
		$(`.TermText.notranslate`)[1].className.substring(26, 28)];

	let vocArr = [];

	for (let i in Array($(`.TermText.notranslate.lang-${langs[0]}`).length).fill()) {
		vocArr.push([$(`.TermText.notranslate.lang-${langs[0]}`)[i].innerText,
		$(`.TermText.notranslate.lang-${langs[1]}`)[i].innerText]);
	};

	let userLang = navigator.language.toLowerCase();
	if (userLang == "de" || userLang == "de-de" || userLang == "de-at" || userLang == "de-ch") {
		userLang = "de";
	} else {
		userLang = "en";
	}

	let title = document.title;
	title = title.substring(0, title.length - 10);

	let consoleText;

	if (userLang == "de") {
		consoleText = `Die Vokabeln des Lernsets "${title}" wurden erfolgreich zur Datenbank hinzugefügt. ${"\n"
			}Gehe nun zurück zu benjaminaster.com/copy-quizlet, um auszuwählen, welche Vokabeln du in dein eigenes Quizlet exportieren möchtest.`;
	} else {
		consoleText = `The vocabulary of the learnset "${title}" has been successfully added to the database. ${"\n"
			}Now go back to benjaminaster.com/copy-quizlet to choose which vocabulary you want to export to your own Quizlet.`;
	}

	console.table(vocArr);
	console.log(
		"%c" + consoleText,
		`background: black;
		color: white;
		font-family: sans-serif;
		font-size: 2em;`);

	console.log(langs, vocArr, userLang, title, consoleText);

	// console.log(firebase);
	// console.log(database);

}

function initFirebase() {
	let firebaseConfig = {
		apiKey: "AIzaSyDS76v4WlBEUbJrQTbDbwFFHdN3n_zqKFg",
		authDomain: "benjamin-aster.firebaseapp.com",
		databaseURL: "https://benjamin-aster.firebaseio.com",
		projectId: "benjamin-aster",
		storageBucket: "benjamin-aster.appspot.com",
		messagingSenderId: "1043928494448",
		appId: "1:1043928494448:web:45725d68d9278747ca1fb5",
		measurementId: "G-Z96EP3QXLR"
	};

	firebase.initializeApp(firebaseConfig);
	database = firebase.database();
}



/*
let xhttpApp = new XMLHttpRequest();
xhttpApp.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		eval(xhttpApp.responseText);

		let xhttpDatabase = new XMLHttpRequest();
		xhttpDatabase.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				eval(xhttpDatabase.responseText);

				initFirebase();
				setTimeout(getLearnset, 200);
			}
		};
		xhttpDatabase.open("GET", "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.24.0/firebase-database.js", true);
		xhttpDatabase.send();
	}
};
xhttpApp.open("GET", "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.24.0/firebase-app.js", true);
xhttpApp.send();
*/



let database;
let xhttpApp = new XMLHttpRequest();
xhttpApp.open("GET", "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.js", true);
xhttpApp.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		eval(xhttpApp.responseText);

		$.get("https://cdnjs.cloudflare.com/ajax/libs/firebase/7.24.0/firebase-app.js", (data) => {
			eval(data);
			$.get("https://cdnjs.cloudflare.com/ajax/libs/firebase/7.24.0/firebase-database.js", (data) => {
				eval(data);

				initFirebase();
				setTimeout(getLearnset, 200);
			});
		});
	}
};
xhttpApp.send();
