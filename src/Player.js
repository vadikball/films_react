import React, { useState, useRef } from 'react';

const Player = ({ videoRef, pushPlay, pushSeeked, pushPause }) => {
  return (
    <div className="Player">
      <video
        ref={videoRef}
        width="100%"
        height="100%"
        controls
        onPlay={pushPlay}
        onSeeked={pushSeeked}
        onPause={pushPause}>
        <source
          src="http://localhost:8082/api/wt/v1/stream/bc905a08-4484-4fcb-9748-cdc55bfee3e3?quality=1280x720"
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default Player;
