import React, { useEffect, useState, useRef } from 'react';

import Chat from './Chat';
import Player from './Player';

export default function MainComponent() {
  const videoRef = useRef(null);
  const wsRef = useRef(null);
  const room_id = useRef('35b3eae3-515c-477f-8a28-d97e38f7373e');
  const token = useRef(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YWJkNzhjMi1jNjRhLTQyY2QtOTM0YS1hMDcyZWYwMThmNzEiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjIsImlzX3N1cGVydXNlciI6dHJ1ZSwicGVybWlzc2lvbnMiOltdfQ.nG60MqgR0wXJds9P8kFlArf9L9f_-jiwzslSYzEUKHY',
  );
  const lastMessageR = useRef(null);
  const [lastMessageS, setMessage] = useState(null);
  const inputRef = useRef(null);
  const holderRef = useRef(null);
  const [chatState, setChatState] = useState([{ login: 'Test l', messageText: 'Test M' }]);
  //const [wsstate, setws] = useState(null);
  const [senderstate, setsender] = useState(null);

  useEffect(() => {
    wsRef.current = new WebSocket(
      `ws://localhost:8082/api/wt/v1/rooms/ws/${room_id.current}`,
      //null,
      //{
      //  headers: { Authorization: `Bearer ${token.current}` },
      //},
    );
    setsender(String(Math.floor(Math.random() * 10)));
    return () => {
      wsRef.current.close();
    };
    //let ws = new WebSocket(`ws://localhost:8081/api/v1/ws/${room_id}?token=${token}`);
    //ws.onmessage = (event) => {
    //  console.log(chatState);
    //  let content = JSON.parse(event.data);
    //  if (content.message_type === 'message') {
    //    setChatState(chatState.concat([{ login: content.sender, messageText: content.message }]));
    //  }
    //};
    //setws(ws);
  }, []);

  useEffect(() => {
    if (!wsRef.current) return;

    wsRef.current.onmessage = (event) => {
      lastMessageR.current = JSON.parse(event.data);
      console.log(lastMessageR.current);
      if (lastMessageR.current.message_type === 'message') {
        setChatState(
          chatState.concat([
            { login: lastMessageR.current.sender, messageText: lastMessageR.current.message },
          ]),
        );
      } else if (lastMessageR.current.message_type === 'control') {
        if (lastMessageR.current.control_type === 'play') {
          videoRef.current.play();
        } else if (lastMessageR.current.control_type === 'pause') {
          videoRef.current.pause();
        } else if (lastMessageR.current.control_type === 'seeked') {
          videoRef.current.currentTime = lastMessageR.current.seeked_time;
        }
      }
    };
  }, [chatState]);

  const sendMessage = () => {
    if (inputRef.current.value !== '') {
      setMessage(
        JSON.stringify({
          sender: senderstate,
          message: inputRef.current.value,
          message_type: 'message',
        }),
      );
      //wsRef.current.send(lastMessageS.current);
      // setChatState(chatState.concat([{ login: senderstate, messageText: inputRef.current.value }]));
      inputRef.current.value = '';
    }
  };

  const pushPlay = () => {
    if (!lastMessageR.current) {
      setMessage(
        JSON.stringify({
          sender: senderstate,
          control_type: 'play',
          message_type: 'control',
        }),
      );
    }
    if (lastMessageR.current && lastMessageR.current.control_type !== 'play') {
      setMessage(
        JSON.stringify({
          sender: senderstate,
          control_type: 'play',
          message_type: 'control',
        }),
      );
    }
  };

  const pushSeeked = (e) => {
    if (!lastMessageR.current) {
      setMessage(
        JSON.stringify({
          sender: senderstate,
          control_type: 'seeked',
          message_type: 'control',
          seeked_time: videoRef.current.currentTime,
        }),
      );
    }
    if (lastMessageR.current && lastMessageR.current.control_type !== 'seeked') {
      if (lastMessageR.current.seeked_time !== videoRef.current.currentTime) {
        setMessage(
          JSON.stringify({
            sender: senderstate,
            control_type: 'seeked',
            message_type: 'control',
            seeked_time: videoRef.current.currentTime,
          }),
        );
      }
    }
  };

  const pushPause = (e) => {
    if (!lastMessageR.current) {
      setMessage(
        JSON.stringify({
          sender: senderstate,
          control_type: 'pause',
          message_type: 'control',
        }),
      );
    }
    if (lastMessageR.current && lastMessageR.current.control_type !== 'pause') {
      setMessage(
        JSON.stringify({
          sender: senderstate,
          control_type: 'pause',
          message_type: 'control',
        }),
      );
    }
  };

  useEffect(() => {
    if (!wsRef.current) return;
    if (!lastMessageS) return;
    wsRef.current.send(lastMessageS);
  }, [lastMessageS]);

  return (
    <>
      <Player
        videoRef={videoRef}
        pushPlay={pushPlay}
        pushSeeked={pushSeeked}
        pushPause={pushPause}
      />
      <Chat
        holderRef={holderRef}
        chatState={chatState}
        inputRef={inputRef}
        sendMessage={sendMessage}
      />
    </>
  );
}
