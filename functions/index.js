const functions = require('firebase-functions');
const Filter = require('bad-words');

const admin = require('firebase-admin');
admin.initializeApp();

exports.filterBadWords = functions.firestore
  .document('messages/{docID}')
  .onCreate((doc, context) => {
    const filter = new Filter();
    const { message } = doc.data();

    if (filter.isProfane(message)) {
      return doc.ref.update({
        message: '[message was deleted for profanity 🤐]',
      });
    }

    return null;
  });

exports.incrementUserWrites = functions.firestore
  .document('messages/{docID}')
  .onCreate((doc, context) => {
    const { uid } = doc.data();
    const uidDocRef = admin.firestore().collection('users').doc(uid);

    uidDocRef.get().then((doc) => {
      if (doc.exists) {
        const increment = admin.firestore.FieldValue.increment(1);
        return uidDocRef.update({ writes: increment });
      } else {
        return uidDocRef.set({ writes: 1 });
      }
    });
  });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
