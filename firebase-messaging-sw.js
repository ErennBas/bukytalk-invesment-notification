// It's a static script file, so it won't be covered by a module bundling system
// hence, it uses "importScripts" function to load the other libs
importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-messaging.js');

console.log("testo");

var firebaseConfig = {
    apiKey: "AIzaSyD3ONDD49hu6KAUF_sOaA-P8R1KMvD5mBY",
    authDomain: "utility-tempo-266816.firebaseapp.com",
    databaseURL: "https://utility-tempo-266816.firebaseio.com",
    projectId: "utility-tempo-266816",
    storageBucket: "utility-tempo-266816.appspot.com",
    messagingSenderId: "912029956180",
    appId: "1:912029956180:web:66f85a8f7fc163e20d95c1",
    measurementId: "G-X75WKB0VVG"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.getToken({vapidKey: 'BLy6FjtuX7Wu1oh8dVEU7v5uTBZ00w0YxZl9nudf2txjt8-Bo9xFfikli3VjBtPtQoq_7-OrbgPTJpoFwTWTXyY'}).then(ress => {
    console.log("tokken => ", ress);
});
console.log(messaging);

// messaging.onBackgroundMessage((payload) => {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//       body: 'Background Message body.',
//       icon: '/firebase-logo.png'
//     };
  
//     self.registration.showNotification(notificationTitle,
//       notificationOptions);
//   });
//   console.log(messaging.bgMessageHandler);

// Not necessary, but if you want to handle clicks on notifications
self.addEventListener('notificationclick', (event) => {
    event.notification.close()

    const pathname = event.notification?.data?.FCM_MSG?.notification?.data?.link
    if (!pathname) return
    const url = new URL(pathname, self.location.origin).href

    event.waitUntil(
        self.clients
            .matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientsArr) => {
                const hadWindowToFocus = clientsArr.some((windowClient) =>
                    windowClient.url === url ? (windowClient.focus(), true) : false
                )

                if (!hadWindowToFocus)
                    self.clients
                        .openWindow(url)
                        .then((windowClient) =>
                            windowClient ? windowClient.focus() : null
                        )
            })
    )
})  

// messaging.onMessage((payload) => {
//     console.log('Message received. ', payload);
//     // ...
//   });
