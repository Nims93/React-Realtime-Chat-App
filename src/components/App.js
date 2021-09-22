import React, { useState, useEffect, useRef } from 'react';
import app, { auth, firestore } from '../utils/InitialiseFirebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import TopBar from './TopBar';
import ChatRoom from './ChatRoom';
import ChatInput from './ChatInput';
import SignInOut from './SignInOut';

const rootEle = document.getElementById('root');
const initialTheme = localStorage.getItem('theme');

if (initialTheme) {
  rootEle.classList.add(initialTheme);
} else {
  rootEle.classList.add('light');
  localStorage.setItem('theme', 'light');
}

function App() {
  const [user] = useAuthState(auth);
  const [theme, setTheme] = useState(initialTheme ? initialTheme : 'light');
  const firstMount = useRef(true);

  useEffect(() => {
    if (!firstMount.current) {
      if (theme === 'dark') {
        rootEle.classList.replace('light', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        rootEle.classList.replace('dark', 'light');
        localStorage.setItem('theme', 'light');
      }
    } else {
      firstMount.current = false;
    }
  }, [theme]);

  return (
    <div className="App">
      <TopBar user={user} theme={theme} setTheme={setTheme} />
      {!user && <SignInOut className={'sign-in'} user={user} />}
      <ChatRoom firestore={firestore} auth={auth} />
      <ChatInput app={app} firestore={firestore} auth={auth} />
    </div>
  );
}

export default App;
