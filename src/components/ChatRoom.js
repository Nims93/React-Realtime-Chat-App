import React, { useRef, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage';

export default function ChatRoom({ firestore, auth }) {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(50);
  const [messages] = useCollectionData(query, { idField: 'id' });
  const bottomDivRef = useRef();
  const chatRoomRef = useRef();

  // console.log(auth);
  // console.log(firestore);
  // console.log(messages);

  useEffect(() => {
    bottomDivRef.current.scrollIntoView();
  });

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
            displayName={auth.currentUser ? msg.displayName : null}
            message={msg.message}
            localTimestamp={msg.localDateSeconds}
            uid={auth.currentUser ? msg.uid : null}
            auth={auth}
            messagesRef={messagesRef}
            key={msg.id}
          />
        ))}
      <div ref={bottomDivRef}></div>
    </div>
  );
}
