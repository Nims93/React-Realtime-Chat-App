export default function ChatMessage({
  imgURL,
  displayName,
  message,
  id,
  uid,
  auth,
  messagesRef,
}) {
  const messageClass =
    uid === auth.currentUser.uid ? 'chat-item sent' : 'chat-item';

  const deleteMessage = () => {
    const docID = auth.currentUser.uid + id;

    try {
      messagesRef.doc(docID).delete();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id={id} className={messageClass}>
      <div className="delete-button" onClick={deleteMessage}>
        Delete
      </div>
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
