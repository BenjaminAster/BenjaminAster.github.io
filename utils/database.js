var database;

$.getScript("https://www.gstatic.com/firebasejs/7.19.0/firebase.js", function () {

	$.getScript("https://www.gstatic.com/firebasejs/7.19.0/firebase-analytics.js", function () {



		console.log("database file included");

		class Database {
			constructor() {
				var config = {
					apiKey: "AIzaSyDS76v4WlBEUbJrQTbDbwFFHdN3n_zqKFg",
					authDomain: "benjamin-aster.firebaseapp.com",
					databaseURL: "https://benjamin-aster.firebaseio.com",
					projectId: "benjamin-aster",
					storageBucket: "benjamin-aster.appspot.com",
					messagingSenderId: "1043928494448",
					appId: "1:1043928494448:web:45725d68d9278747ca1fb5",
					measurementId: "G-Z96EP3QXLR"
				};
				// Initialize Firebase
				firebase.initializeApp(config);
				firebase.analytics();

				this.database = firebase.database();
			}

			write(path, object) {
				//let object = {};
				//eval(`object.${key} = value`);
				this.database.ref(path).set(object);
			}

			push(path, object) {
				//let object = {};
				//eval(`object.${key} = value`);
				//this.database.ref(path).push().set(object);
				this.database.ref(path).push(object);
			}

			read(path, callback = function () { }) {
				this.database.ref(path).once("value", function (data) {
					let value = data.val();
					callback(value);
				})
			}

			/*
			read(path, key, callback = function () { }) {
				this.database.ref(path).once("value", function (data) {
					let value = eval(`data.val().${key}`);
					callback(value);
				})
			}
			*/

			getKeys(path, callback = function () { }) {
				this.database.ref(path).once("value", function (data) {
					let keys = Object.keys(data.val());
					callback(keys);
				})
			}

			on(path, onChange = function () { }) {
				this.database.ref(path).on("value", function (data) {
					onChange();
				})
			}
		}

		database = new Database();


	});


});


//includeScript("https://www.gstatic.com/firebasejs/7.19.0/firebase-analytics.js");

/*
let isReady=false;

while (!isReady) {
	try {
		//firebase;
		isReady=true;
	} catch {
		console.log("error");
	}

}
*/



//while (firebase == undefined) { }

/*
let config = {
	apiKey: "AIzaSyDS76v4WlBEUbJrQTbDbwFFHdN3n_zqKFg",
	authDomain: "benjamin-aster.firebaseapp.com",
	databaseURL: "https://benjamin-aster.firebaseio.com",
	projectId: "benjamin-aster",
	storageBucket: "benjamin-aster.appspot.com",
	messagingSenderId: "1043928494448",
	appId: "1:1043928494448:web:45725d68d9278747ca1fb5",
	measurementId: "G-Z96EP3QXLR"
};
// Initialize Firebase
firebase.initializeApp(config);
firebase.analytics();

let database = firebase.database();

function writeToDatabase(path, key, value) {
	database.ref(path).set(
		eval(`{${key}: ${value}}`)
	);
}

function readFromDatabase(path, key, value) {

}
*/