import Message from './Message';

export default function Chat({ holderRef, chatState, inputRef, sendMessage }) {
  return (
    <div className="Chat">
      <div className="ChatHolder" ref={holderRef}>
        {chatState.map((item) => (
          <Message login={item.login} messageText={item.messageText} />
        ))}
      </div>
      <div className="InputHolder">
        <input className="ChatInput" type="text" ref={inputRef} />
        <button className="SendButton" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
