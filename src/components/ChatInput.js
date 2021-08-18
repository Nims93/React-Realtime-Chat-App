import React, { useState, useRef, useEffect } from 'react';

export default function ChatInput({ firebase, firestore, auth }) {
  const textareaRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const sendMessageToDB = async (e) => {
    e.preventDefault();
    const msg = inputValue;
    const messagesRef = firestore.collection('messages');
    const { displayName, photoURL, uid } = auth.currentUser;

    console.log(displayName);

    try {
      await messagesRef.add({
        displayName,
        message: msg,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
      });
    } catch (err) {
      console.log(err);
    }

    setInputValue('');
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
          placeholder="Enter text here..."
          value={inputValue}
          onInput={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && inputValue !== '') {
              sendMessageToDB(e);
            }
          }}
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
