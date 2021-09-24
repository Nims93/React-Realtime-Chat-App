import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// firebase.initializeApp({
//   apiKey: 'AIzaSyA8Qq49hTm_WtRiaaddA2S91JX09sTLKfc',
//   authDomain: 'realtime-react-chat-app.firebaseapp.com',
//   databaseURL:
//     'https://realtime-react-chat-app-default-rtdb.europe-west1.firebasedatabase.app',
//   projectId: 'realtime-react-chat-app',
//   storageBucket: 'realtime-react-chat-app.appspot.com',
//   messagingSenderId: '288793514543',
//   appId: '1:288793514543:web:b3efa82dcd4f0fa1e1acda',
// });

console.log(process.env);

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER,
  appID: process.env.REACT_APP_FIREBASE_APP_ID,
});

export default firebase;
export const auth = firebase.auth();
export const firestore = firebase.firestore();
