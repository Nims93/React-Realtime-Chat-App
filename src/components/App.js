import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import ChatRoom from './ChatRoom';
import ChatInput from './ChatInput';

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

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  // const [aias, setAlias] = useState(null);

  function handleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <div
      className="App"
      style={user ? { backgroundColor: 'green' } : { backgroundColor: 'red' }}
    >
      <div className="topbar">
        {/* {user && <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>} */}
        <button className="sign-out" onClick={() => auth.signOut()}>
          Sign Out
        </button>
      </div>

      {!user && (
        <button className="sign-in" onClick={handleSignIn}>
          Sign In with Google
        </button>
      )}

      <ChatRoom firebase={firebase} firestore={firestore} auth={auth} />
      <ChatInput firebase={firebase} firestore={firestore} auth={auth} />
    </div>
  );
}

export default App;
