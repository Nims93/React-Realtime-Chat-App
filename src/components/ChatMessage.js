export default function ChatMessage({ message, id }) {
  return (
    <div>
      <p>{id}</p>
      <span> / </span>
      <p>{message}</p>
    </div>
  );
}
