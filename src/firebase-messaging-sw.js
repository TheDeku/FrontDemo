importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-storage.js');


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDauPwyPi9g_e93mlpipLxKDFrthzYRBvs",
    authDomain: "message-restaurapp.firebaseapp.com",
    databaseURL: "https://message-restaurapp.firebaseio.com",
    projectId: "message-restaurapp",
    storageBucket: "message-restaurapp.appspot.com",
    messagingSenderId: "497808155462",
    appId: "1:497808155462:web:08c210c2fcbb388c1e3b47"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();