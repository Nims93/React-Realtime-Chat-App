import { RiDeleteBack2Fill as DeleteIcon } from 'react-icons/ri';

export default function ChatMessage(props) {
  const {
    imgURL,
    // displayName,
    message,
    localTimestamp,
    uid,
    auth,
    messagesRef,
  } = props;

  const deleteMessage = () => {
    const docID = auth.currentUser.uid + localTimestamp;

    if (
      uid === auth.currentUser.uid ||
      uid === process.env.REACT_APP_ADMIN_UID
    ) {
      try {
        messagesRef.doc(docID).delete();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div
      id={localTimestamp}
      className={
        uid === auth.currentUser?.uid ? 'chat-item sent' : 'chat-item recieved'
      }
    >
      {auth.currentUser &&
        (uid === auth.currentUser.uid ||
          uid === process.env.REACT_APP_ADMIN_UID) && (
          <div className="delete-button" onClick={deleteMessage}>
            <DeleteIcon />
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
