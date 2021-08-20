import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage';

export default function ChatRoom({ firestore, auth }) {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(50);
  const [messages] = useCollectionData(query, { idField: 'id' });

  // console.log(auth);
  // console.log(firestore);
  // console.log(messages);

  return (
    <div className="chat-room">
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
    </div>
  );
}
//
