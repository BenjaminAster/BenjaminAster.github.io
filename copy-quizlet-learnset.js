

function getLearnset() {
	var langs = [
		document.querySelectorAll(`.TermText.notranslate`)[0].className.substring(26, 28),
		document.querySelectorAll(`.TermText.notranslate`)[1].className.substring(26, 28)];

	var sepChars = ["§§\n", "$$\n"];
	var vocArr = [];

	var vocStr = "";

	for (let i in Array(document.querySelectorAll(`.TermText.notranslate.lang-${langs[0]}`).length).fill()) {
		vocArr.push([document.querySelectorAll(`.TermText.notranslate.lang-${langs[0]}`)[i].innerText,
		document.querySelectorAll(`.TermText.notranslate.lang-${langs[1]}`)[i].innerText]);

		vocStr += vocArr[i][0] + sepChars[0] + vocArr[i][1] + sepChars[1];
	};

	vocStr = vocStr.substring(0, vocStr.length - 3);

	var title = document.title;
	title = title.substring(0, title.length - 10);

	var el = document.createElement('textarea');
	el.value = vocStr;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);

	console.table(vocArr);
	console.log(`Learnset copied!`);


	// console.log(firebase);
	// console.log(database);

}

function initFirebase() {
	var firebaseConfig = {
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


var database;
var xhttpApp = new XMLHttpRequest();
xhttpApp.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		eval(xhttpApp.responseText);

		var xhttpDatabase = new XMLHttpRequest();
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


