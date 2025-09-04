import * as admin from "firebase-admin";

try {
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === "production") {
    const serviceAccount = require("./admin.json");
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.NEXT_PUBLIC_firebase_databaseURL,
        storageBucket: process.env.NEXT_PUBLIC_firebase_storage_bucket,
      });
    } else {
      admin.app();
    }
  } else {
    const serviceAccount = require("./admin-test.json");
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.NEXT_PUBLIC_firebase_databaseURL,
        storageBucket: process.env.NEXT_PUBLIC_firebase_storage_bucket,
      });
    } else {
      admin.app();
    }
  }
} catch (error) {
  console.error("Firebase Error:", error);
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    // eslint-disable-next-line no-console
    console.error("Firebase admin initialization error", error.stack);
  }
}

export default admin;
