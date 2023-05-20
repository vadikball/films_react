import ReactPlayer from 'react-player';
import React, { useRef } from 'react';
const VIDEO_PATH =
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
function PlayerComponent() {
  const playerRef = useRef(null);
  return (
    <div className="Player">
      <ReactPlayer
        ref={playerRef}
        url={VIDEO_PATH}
        controls={true}
        controlslist={['nodownload', 'noremoteplayback']}
      />
    </div>
  );
}
export default PlayerComponent;
