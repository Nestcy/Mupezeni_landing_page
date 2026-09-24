import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "mock-api-key-for-development",
  authDomain: "mupezeni-retail.firebaseapp.com",
  projectId: "mupezeni-retail",
  storageBucket: "mupezeni-retail.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  db = getFirestore(app);
} catch (err) {
  console.warn("Firebase initialized in fallback mode:", err);
}

export { app, db };
