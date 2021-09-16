import React, { useRef, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage';

let reRenders = 0;

export default function ChatRoom({ firestore, auth }) {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(50);
  const [messages] = useCollectionData(query, { idField: 'id' });
  const bottomDivRef = useRef();
  const chatRoomRef = useRef();

  // console.log(auth);
  // console.log(firestore);
  // console.log(messages);
  // console.log('<br>');

  useEffect(() => {
    bottomDivRef.current.scrollIntoView();
  }, []);

  useEffect(() => {
    if (
      chatRoomRef.current.offsetHeight -
        Math.abs(chatRoomRef.current.scrollTop) ===
      chatRoomRef.current.clientHeight
    ) {
      bottomDivRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="chat-room" ref={chatRoomRef}>
      {messages &&
        messages.map((msg) => (
          <ChatMessage
            imgURL={msg.photoURL}
            displayName={msg.displayName}
            message={msg.message}
            id={msg.localDateSeconds}
            uid={msg.uid}
            auth={auth}
            messagesRef={messagesRef}
            key={msg.id}
          />
        ))}
      <div ref={bottomDivRef}></div>
    </div>
  );
}
//
