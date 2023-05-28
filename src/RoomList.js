import React, { useEffect } from 'react';
import RoomInfo from './RoomInfo';

export default function RoomList({ rooms, setRooms, user }) {
  const fetchRooms = async () => {
    console.log('Bearer ' + user.access_token);
    const raw = await fetch('http://localhost/api/wt/v1/users/rooms', {
      headers: {
        Authorization: 'Bearer ' + user.access_token,
      },
      method: 'GET',
    });
    console.log(raw);
    const content = await raw.json();
    console.log(content);
    setRooms(content);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="RoomList">
      Rooms
      {rooms.map((room) => (
        <RoomInfo roomName={room.name} filmName={room.film_id} uuid={room.id} />
      ))}
    </div>
  );
}
