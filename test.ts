import { initializeApp } from '';
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging.js";

// Replace these values with your project's ones
// (you can find such code in the Console)
const firebaseConfig = {
    apiKey: 'xxxxx-xxx',
    authDomain: 'xxxx.firebaseapp.com',
    projectId: 'xxxx-xxxx',
    storageBucket: 'xxxx.appspot.com',
    messagingSenderId: '00000000',
    appId: '0:00000:00000000'
};

export const app = initializeApp(firebaseConfig);
const messaging = getMessaging();

export async function getFCMToken() {
    try {
        // Don't forget to paste your VAPID key here
		// (you can find it in the Console too)
        const token = await getToken(messaging, { vapidKey: "BLy6FjtuX7Wu1oh8dVEU7v5uTBZ00w0YxZl9nudf2txjt8-Bo9xFfikli3VjBtPtQoq_7-OrbgPTJpoFwTWTXyY" });
        return token;
    } catch (e) {
        console.log('getFCMToken error', e);
        return undefined
    }
}