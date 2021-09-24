import React from 'react';
import DarkModeToggle from './DarkModeToggle';
import SignInOut from './SignInOut';

export default function TopBar({ user, theme, setTheme }) {
  return (
    <div className="topbar">
      <DarkModeToggle theme={theme} setTheme={setTheme} />
      {user && <SignInOut user={user} className={'sign-out'} />}
    </div>
  );
}
