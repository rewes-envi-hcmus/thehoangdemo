function getRealTime() {
  var percent = new Date();
  var gio = percent.getHours();
  var phut = percent.getMinutes();
  var giay = percent.getSeconds();
  if (gio < 10) gio = "0" + gio;
  if (phut < 10) phut = "0" + phut;
  if (giay < 10) giay = "0" + giay;
  document.getElementById("realtime1").innerHTML =
    gio + ":" + phut + ":" + giay;
  // setInterval("getRealTime()", 1000);
}
setInterval("getRealTime()", 1000);

// var myVar = setInterval(myTimer, 1000);

// function myTimer() {
//   $(document).ready(function () {
//     // $.getJSON("https://rewes.herokuapp.com/", function (response) {
//     $.getJSON("https://dummy-data-rewes.herokuapp.com/", function (response) {
//       // $.getJSON("http://nguyen-nulab.ddns.net:8001/web/updatert", function (
//       //   response
//       // ) {
//       var sensor1 = response.dose;
//       var sensor1 = sensor1.toFixed(3);

//       document.getElementById("sensor1").innerHTML = sensor1 + " µSv/h";

//       var sensor2 = response.Te;
//       var sensor2 = sensor2.toFixed(2);
//       document.getElementById("sensor2").innerHTML = sensor2 + " °C";

//       var sensor3 = response.Hu;
//       var sensor3 = sensor3.toFixed(2);
//       document.getElementById("sensor3").innerHTML = sensor3 + " %";

//       var sensor4 = response.sen3;
//       var sensor4 = sensor4.toFixed(3);
//       document.getElementById("sensor4").innerHTML = sensor4 + " µg/m3";

//       var sensor5 = response.sen1;
//       var sensor5 = sensor5.toFixed(1);
//       document.getElementById("sensor5").innerHTML = sensor5 + " ppm";

//       var ch44 = response.sen2;
//       var ch44 = ch44.toFixed(1);
//       document.getElementById("ch44").innerHTML = ch44 + " ppm";
//     });
//   });
// }

// let dose;
// let temperature;
// let humidity;
// let CO;
// let CH4;
// let dust;

// var firebaseConfig = {
//   apiKey: "AIzaSyDSsikGKgjcjLxVwEuAyMRqfrQO4iOesD4",
//   authDomain: "thehoang-8d8ee.firebaseapp.com",
//   databaseURL: "https://thehoang-8d8ee.firebaseio.com",
//   projectId: "thehoang-8d8ee",
//   storageBucket: "thehoang-8d8ee.appspot.com",
//   messagingSenderId: "804235375577",
//   appId: "1:804235375577:web:1e81bd7926f2d1501e9fc8",
//   measurementId: "G-9MKD8B9SGX",
// };

// firebase.initializeApp(firebaseConfig);
// firebase.analytics();
// var fireBaseRef = new Firebase("https://thehoang-8d8ee.firebaseio.com");

// const database = firebase.database();

// //   const userId = firebase.auth().currentUser.uid;
// getData();
// async function getData() {
//   const rs = await firebase
//     .database()
//     .ref()
//     .once("value")
//     .then((snaps) => {
//       dose = snaps.val().dose;
//       document.getElementById("sensor1").innerHTML = dose;

//       humidity = snaps.val().humidity;
//       document.getElementById("sensor3").innerHTML = humidity;

//       dose = snaps.val().dose;
//       document.getElementById("sensor1").innerHTML = dose;
//     });
// }

// setInterval("myTimer", 1000);
