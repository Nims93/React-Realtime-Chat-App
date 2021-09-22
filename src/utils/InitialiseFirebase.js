import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: 'AIzaSyA8Qq49hTm_WtRiaaddA2S91JX09sTLKfc',
  authDomain: 'realtime-react-chat-app.firebaseapp.com',
  databaseURL:
    'https://realtime-react-chat-app-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'realtime-react-chat-app',
  storageBucket: 'realtime-react-chat-app.appspot.com',
  messagingSenderId: '288793514543',
  appId: '1:288793514543:web:b3efa82dcd4f0fa1e1acda',
});

export default firebase;
export const auth = firebase.auth();
export const firestore = firebase.firestore();
