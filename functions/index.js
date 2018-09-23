const functions = require("firebase-functions");
const axios = require("axios");
const $http = axios.create({
	baseURL: "https:///parcelpintarapi.joanlamrack.me"
});
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
	response.send("Hello from Firebase!");
});

exports.updateParcelGPSGyro = functions.database
	.ref("/parcels/{parcelId}")
	.onUpdate((snapshot, context) => {
		const data = snapshot.val();
		$http.patch("/parcels/" + context.params.parcelId, {
			long: data.gps.location.long,
			lat: data.gps.location.lat,
			threshold: data.gyro.threshold
		});
	});
