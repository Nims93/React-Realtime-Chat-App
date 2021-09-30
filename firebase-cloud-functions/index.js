const Filter = require('bad-words');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.filterBadWords = functions.firestore
  .document('messages/{docID}')
  .onCreate(async (doc, context) => {
    const filter = new Filter();
    const { message } = doc.data();

    if (filter.isProfane(message)) {
      await doc.ref.update({
        message: '[message was deleted for profanity 🤐]',
      });
    }
  });

// const db = admin.firestore();

// exports.incrementUserWrites = functions.firestore
//   .document('messages/{docID}')
//   .onCreate(async (doc, context) => {
//     const { uid } = doc.data();
//     const uidDoc = await db.collection('users').doc(uid).get();

//     if (uidDoc.exists) {
//       let payload =
//         uidDoc.data().writes >= 50
//           ? { banned: true }
//           : { writes: admin.firestore.FieldValue.increment(1) };
//       await uidDoc.ref.update(payload);
//     } else {
//       await uidDoc.ref.set({ writes: 1, banned: false });
//     }
//   });
