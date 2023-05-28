import { Link } from 'react-router-dom';

export default function RoomInfo({ roomName, filmName, uuid }) {
  return (
    <div className="RoomInfo" key={uuid}>
      <Link to={`/watch-together/room/${uuid}`}>
        <div className="RoomText">{roomName}</div>
      </Link>
    </div>
  );
}

//        <div className="RoomText">{roomName}</div>
