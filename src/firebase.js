// import firebase from "firebase/app";
// import "firebase/analytics";
// import "firebase/auth";
// import "firebase/storage";
import { initializeApp, firebase } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_firebase_apiKey,
  authDomain: process.env.NEXT_PUBLIC_firebase_authDomain,
  databaseURL: process.env.NEXT_PUBLIC_firebase_databaseURL,
  projectId: process.env.NEXT_PUBLIC_firebase_projectId,
  appId: process.env.NEXT_PUBLIC_firebase_appId,
  measurementId: process.env.NEXT_PUBLIC_firebase_measurementId,
  storageBucket: process.env.NEXT_PUBLIC_firebase_storage_bucket,
};

if (typeof window !== undefined && !firebase?.apps?.length) {
  initializeApp(firebaseConfig);
}

export default firebase;
