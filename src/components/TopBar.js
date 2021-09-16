import React from 'react';
import SignInOut from './SignInOut';

export default function TopBar({ user }) {
  return (
    <div className="topbar">
      {user && <SignInOut user={user} className={'sign-out'} />}
    </div>
  );
}
