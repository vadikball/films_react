import React, { useState, useRef, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

import NewRoom from './NewRoom';
import RoomList from './RoomList';

export default function Main({ user, setUser }) {
  const [rooms, setRooms] = useState([]);
  const roomInputRef = useRef(null);
  if (!user.access_token) {
    return <Navigate to="/auth" replace />;
  }
  console.log(user);
  console.log('MainRender');

  const createRoom = async () => {
    if (!roomInputRef.current.value) {
      return;
    }
    const film_id = crypto.randomUUID();
    const raw = await fetch('http://localhost/api/wt/v1/rooms', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.access_token,
      },
      method: 'POST',
      body: JSON.stringify({
        name: roomInputRef.current.value,
        film_id: film_id,
      }),
    });
    const content = raw.json();

    setRooms(
      rooms.concat([{ name: roomInputRef.current.value, id: content.id, film_id: film_id }]),
    );
    roomInputRef.current.value = '';
  };
  //useEffect(() => {
  //  createRoom()
  //})

  return (
    <>
      <LogoutButton setUser={setUser} user={user} />
      <RoomList rooms={rooms} setRooms={setRooms} user={user} />
      <NewRoom createRoom={createRoom} roomInputRef={roomInputRef} />
    </>
  );
}

function LogoutButton({ user, setUser }) {
  console.log(user);
  const logout = () => {
    console.log('logout');
    setUser({ access_token: null, refresh_token: null });
  };
  return <input type="button" onClick={logout} value="logout" className="LogOutButton" />;
}
