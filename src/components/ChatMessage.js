import { IoMdClose } from 'react-icons/io';

export default function ChatMessage({
  imgURL,
  displayName,
  message,
  id,
  uid,
  auth,
  messagesRef,
}) {
  let messageClass;
  if (auth.currentUser) {
    messageClass =
      uid === auth.currentUser.uid ? 'chat-item sent' : 'chat-item recieved';
  } else {
    messageClass = 'chat-item recieved';
  }

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
      {uid === auth.currentUser.uid && (
        <div className="delete-button" onClick={deleteMessage}>
          <IoMdClose />
        </div>
      )}
      <img src={imgURL} alt="avatar" className="display-pic" />
      <div className="message">
        {/* <span className="display-name">{displayName}</span> */}
        <span className="content">{message}</span>
      </div>
    </div>
  );
}
