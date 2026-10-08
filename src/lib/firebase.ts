import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import firebaseAppletConfig from '../../firebase-applet-config.json';

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseAppletConfig);
  } else {
    app = getApps()[0];
  }
  const dbId = (firebaseAppletConfig as any).firestoreDatabaseId;
  db = dbId ? getFirestore(app, dbId) : getFirestore(app);
} catch (err) {
  console.warn("Firebase initialized in fallback mode:", err);
}

export { app, db };
