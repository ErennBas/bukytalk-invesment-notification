
const { initializeApp } = require('firebase/app');
const { getMessaging, getToken } = require('firebase/messaging');
const fs = require('fs');

var fcmAdmin = require("firebase-admin");
const path = require("path");
const express = require('express');
const app = express();

const firebaseConfig = {
    apiKey: "AIzaSyD3ONDD49hu6KAUF_sOaA-P8R1KMvD5mBY",
    authDomain: "utility-tempo-266816.firebaseapp.com",
    databaseURL: "https://utility-tempo-266816.firebaseio.com",
    projectId: "utility-tempo-266816",
    storageBucket: "utility-tempo-266816.appspot.com",
    messagingSenderId: "912029956180",
    appId: "1:912029956180:web:66f85a8f7fc163e20d95c1",
    measurementId: "G-X75WKB0VVG"
};
const firebaseApp = initializeApp(firebaseConfig);

var serviceAccount = require("./utility-tempo-266816-firebase-adminsdk-qnsr7-34dfd76128.json");
fcmAdmin.initializeApp({
    credential: fcmAdmin.credential.cert(serviceAccount)
});


app.use(express.static(__dirname + "/"));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get("/token", async function (req, res) {
    fs.readFile('fcms.json', (err, data) => {
        if (err) throw err;
        let tokens = JSON.parse(data);
        if (tokens.indexOf(req.query.token) === -1) {
            tokens.push(req.query.token);
            console.log("new token => ", tokens);
            fs.writeFile('fcms.json', JSON.stringify(tokens, null, 2), (err) => {
                if (err) throw err;
                console.log('Data written to file');
                res.send(req.body);
            });
        }
        else {

            res.send(req.body);
        }


    });

});


app.get("/bid", async function (req, res) {
    fs.readFile('fcms.json', (err, data) => {
        if (err) throw err;
        let tokens = JSON.parse(data);
        console.log(tokens);
        for (let i = 0; i < tokens.length; i++) {
            fcmAdmin.messaging().sendToDevice(String(tokens[i]), { notification: { title: "data.subject", body: "data.detail", icon: "https://bukytalk.com/images/logo.webp" }, data: {} }, { priority: "high" }).then((response) => {
                console.log("nvrProblem bildirimi atıldı => ", response);
            }).catch((error) => {
                console.log("Notification Error => ", error);
            });
        }

    });

    res.send("req.body");
});


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
    //res.send('<h1>Merhaba Express</h1>');

    // fcmAdmin.messaging().sendToTopic(req.headers["x-api-key"], { notification: { title: data.subject, body: data.detail }, data: {} }, { priority: "high" }).then((response) => {
    //     console.log("nvrProblem bildirimi atıldı => ", response.results);
    //   }).catch((error) => {
    //     console.log("Notification Error => ", error);
    //   });

});

app.listen(3000, function () {
    console.log('Sunucu çalışıyor...');
})

