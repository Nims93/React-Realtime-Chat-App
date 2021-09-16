import React, { useState } from 'react';
import app, { auth, firestore } from '../utils/InitialiseFirebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import TopBar from './TopBar';
import ChatRoom from './ChatRoom';
import ChatInput from './ChatInput';
import SignInOut from './SignInOut';
import { ThemeContext } from './ThemeContext';

function App() {
  const [user] = useAuthState(auth);
  const [theme, setTheme] = useState('light');
  // console.log(user);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="App">
        <TopBar user={user} />
        {!user && <SignInOut className={'sign-in'} user={user} />}
        <ChatRoom firestore={firestore} auth={auth} />
        <ChatInput app={app} firestore={firestore} auth={auth} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
