// deleteOldFiles.js

const functions = require   ('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.deleteOldFiles = functions.firestore
  .document('uploadedFile/{fileId}')
  .onCreate((snap, context) => {
    const uploadTime = snap.data().uploadTime;
    const now = Date.now();
    const cutoffDate = now - (7 * 24 * 60 * 60 * 1000); // 7 days ago

    if (uploadTime < cutoffDate) {
      return snap.ref.delete();
    }

    return null;
  });
