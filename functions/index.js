const functions = require("firebase-functions");
const axios = require("axios");
const $http = axios.create({
	baseURL: "https://parcelpintarapi.joanlamrack.me"
});
const cors = require("cors")({ origin: true });
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
	response.send("Hello from Firebase!");
});

exports.updateParcelGPSGyro = functions.database
	.ref("/parcels/{parcelId}")
	.onUpdate((snapshot, context) => {
		const data = snapshot.after.val();
		console.log(data);
		if (data.gyro.threshold) {
			return $http.patch("/parcels/" + context.params.parcelId, {
				long: data.gps.long,
				lat: data.gps.lat,
				threshold: data.gyro.threshold
			});
		} else {
			return false;
		}
	});
