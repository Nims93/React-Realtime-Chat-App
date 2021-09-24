const functions = require('firebase-functions');
const Filter = require('bad-words');

const admin = require('firebase-admin');
admin.initializeApp();

exports.filterBadWords = functions.firestore
  .document('messages/{docID}')
  .onCreate((doc, context) => {
    const filter = new Filter();
    const { message, uid } = doc.data();

    if (filter.isProfane(message)) {
      console.log('bad word found');
      return doc.ref.update({
        message: '[message was deleted for profanity 🤐]',
      });
    }
    console.log('no bad word found');
    return null;
  });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
