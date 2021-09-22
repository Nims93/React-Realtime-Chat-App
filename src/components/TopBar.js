import React from 'react';
import DarkModeToggleBtn from './DarkModeBtn';
import SignInOut from './SignInOut';

export default function TopBar({ user, theme, setTheme }) {
  return (
    <div className="topbar">
      <DarkModeToggleBtn theme={theme} setTheme={setTheme} />
      {user && <SignInOut user={user} className={'sign-out'} />}
    </div>
  );
}
