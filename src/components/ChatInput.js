import React, { useState, useRef, useEffect } from 'react';

export default function ChatInput({ firebase, firestore, auth }) {
  const textareaRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const sendMessageToDB = async (e) => {
    if (auth.currentUser && inputValue && inputValue.length <= 200) {
      e.preventDefault();
      const msg = inputValue;
      const { displayName, photoURL, uid } = auth.currentUser;

      try {
        await firestore.runTransaction(async (transaction) => {
          const increment = firebase.firestore.FieldValue.increment(1);
          const serverTimestamp =
            firebase.firestore.FieldValue.serverTimestamp();
          const uidDocRef = firestore.collection('users').doc(uid);
          const bannedDocRef = firestore.collection('banned').doc(uid);
          const uidDoc = await transaction.get(uidDocRef);

          if (uidDoc.exists) {
            uidDoc.data().writes >= 49
              ? transaction.set(bannedDocRef, {})
              : transaction.update(uidDocRef, { writes: increment });
          } else {
            transaction.set(uidDocRef, {
              writes: 1,
              displayName,
              createdAt: serverTimestamp,
              photoURL,
            });
          }

          const localDate = Date.now();
          const docID = auth.currentUser.uid + localDate;
          const messageDocRef = firestore.collection('messages').doc(docID);

          transaction.set(messageDocRef, {
            displayName,
            message: msg,
            createdAt: serverTimestamp,
            localDateSeconds: localDate,
            uid,
            photoURL,
          });
        });
      } catch (e) {
        console.error(e);
      }

      setInputValue('');
    }
  };

  useEffect(() => {
    textareaRef.current.style.height = '0px';
    const scrollHeight = textareaRef.current.scrollHeight + 1;
    textareaRef.current.style.height = scrollHeight + 'px';
  }, [inputValue]);

  return (
    <div className="send-message-wrapper">
      <div
        className="send-message"
        style={auth.currentUser ? { cursor: 'text' } : null}
        onClick={() => textareaRef.current.focus()}
      >
        <textarea
          ref={textareaRef}
          placeholder={
            auth.currentUser ? 'Say something...' : 'Sign in to send a message!'
          }
          value={inputValue}
          onInput={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && inputValue !== '') {
              sendMessageToDB(e);
            }
          }}
          disabled={auth.currentUser ? false : true}
          style={
            inputValue.length >= 200 ? { border: '2px solid #ff000080' } : null
          }
        />
        <button
          className="send-message-button"
          onClick={(e) => sendMessageToDB(e)}
        >
          💬
        </button>
      </div>
    </div>
  );
}
