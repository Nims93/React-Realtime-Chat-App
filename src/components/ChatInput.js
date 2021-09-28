import React, { useState, useRef, useEffect } from 'react';

export default function ChatInput({ firebase, firestore, auth }) {
  const textareaRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const sendMessageToDB = async (e) => {
    if (auth.currentUser && inputValue && inputValue.length <= 200) {
      e.preventDefault();
      const msg = inputValue;
      const messagesRef = firestore.collection('messages');
      const { displayName, photoURL, uid } = auth.currentUser;

      const localDate = Date.now();
      const firestoreDocumentID = auth.currentUser.uid + localDate;

      try {
        await messagesRef.doc(firestoreDocumentID).set({
          displayName,
          message: msg,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          localDateSeconds: localDate,
          uid,
          photoURL,
        });
      } catch (err) {
        console.log(err);
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
