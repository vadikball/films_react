export default function NewRoom({ createRoom, roomInputRef }) {
  return (
    <div className="NewRoom">
      New Room
      <input type="text" placeholder="name" className="NewRoomInput" ref={roomInputRef} />
      <input
        type="text"
        placeholder="film. type for search"
        className="NewRoomInput NewRoomInputFilm"
      />
      <input type="button" value="+" className="NewRoomButton" onClick={createRoom} />
    </div>
  );
}
