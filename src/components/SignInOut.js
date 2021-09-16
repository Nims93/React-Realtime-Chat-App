import React from 'react';
import firebase from 'firebase/app';
import { auth } from './../utils/InitialiseFirebase';
import { ReactComponent as GoogleLogo } from './../assets/GoogleLogo.svg';

function handleSignIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}

function handleSignOut() {
  auth.signOut();
}

export default function SignInOut({ user, className }) {
  let btn;

  user
    ? (btn = (
        <button className={'sign-btn ' + className} onClick={handleSignOut}>
          Sign Out
        </button>
      ))
    : (btn = (
        <button className={'sign-btn ' + className} onClick={handleSignIn}>
          <GoogleLogo /> Sign In With Google
        </button>
      ));

  return btn;
}
