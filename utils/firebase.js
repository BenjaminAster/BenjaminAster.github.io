let imported = document.createElement("script");
imported.src = "https://www.gstatic.com/firebasejs/7.19.1/firebase.js";
document.head.appendChild(imported);

imported = document.createElement("script");
imported.src = "https://www.gstatic.com/firebasejs/7.19.1/firebase-app.js";
document.head.appendChild(imported);

imported = document.createElement("script");
imported.src = "https://www.gstatic.com/firebasejs/7.19.1/firebase-analytics.js";
document.head.appendChild(imported);

configurationElement = document.createElement("script");
configurationElement.innerHTML = `
	// Your web app's Firebase configuration
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
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	firebase.analytics();`;
document.body.appendChild(configurationElement);