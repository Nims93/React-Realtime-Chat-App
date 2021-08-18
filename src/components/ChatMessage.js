export default function ChatMessage({ imgURL, displayName, message, id }) {
  const messageClass = 

  return (
    <div id={id} className="chat-item">
      <img src={imgURL} className="display-pic" />
      <p className="display-name">{displayName}</p>
      <p className="message">{message}</p>
    </div>
  );
}

// displayName
// message
// createdAt
// uid
// photoURL
