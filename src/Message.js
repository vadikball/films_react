export default function Message({ login, messageText }) {
  return (
    <div className="Message" key={messageText}>
      <div className="UserLogin">{login}</div>
      <div className="MessageText">{messageText}</div>
    </div>
  );
}
