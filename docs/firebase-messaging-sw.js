importScripts(
  "https://www.gstatic.com/firebasejs/10.5.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.5.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyA7Rnh8O_f2-ZqVTzEEoCBjfaYfgQxFs8Y",
  authDomain: "meditation-application.firebaseapp.com",
  projectId: "meditation-application",
  storageBucket: "meditation-application.appspot.com",
  messagingSenderId: "982985531402",
  appId: "1:982985531402:web:644ab7cd4baf1588797ff3",
  measurementId: "G-0LSKVTD459",
});
const messaging = firebase.messaging();
