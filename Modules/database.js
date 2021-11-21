const { initializeApp } = require('firebase/app');
const { getDatabase } = require("firebase/database");

const firebaseConfig = {
    apiKey: "AIzaSyB7dHXQaQ_ke2xRL37-orq3j1-RAU7tMV0",
    authDomain: "netconnectv2-9fd5b.firebaseapp.com",
    databaseURL: "https://netconnectv2-9fd5b-default-rtdb.europe-west1.firebasedatabase.app",
    storageBucket: "netconnectv2-9fd5b.appspot.com"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);