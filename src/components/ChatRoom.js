import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage';

export default function ChatRoom({ firestore, auth }) {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.limit(25);
  const [messages] = useCollectionData(query, { idField: 'id' });
  console.log(messages);
  return (
    <div>
      {messages &&
        messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg.message} id={msg.id} />
        ))}
    </div>
    // <h1>yo</h1>
  );
}
