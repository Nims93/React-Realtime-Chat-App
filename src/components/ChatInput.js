import React, { useState, useRef, useEffect } from 'react';

export default function ChatInput({ firebase, firestore, auth }) {
  const textareaRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const sendMessageToDB = async (e) => {
    if (auth.currentUser) {
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
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + 'px';
  }, [inputValue]);

  return (
    <div className="send-message-wrapper">
      <div className="send-message" onSubmit={sendMessageToDB}>
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
        />
        <button onClick={(e) => sendMessageToDB(e)}>💬</button>
      </div>
    </div>
  );
}

{
  /* <textarea
        ref={textareaRef}
        placeholder="Enter text here..."
        value={inputValue}
        onInput={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && inputValue !== '') {
            sendMessageToDB();
          }
        }}
      /> */
}
