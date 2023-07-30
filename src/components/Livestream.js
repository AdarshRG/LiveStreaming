import { Button } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';

function Livestream({ broadcasterPeerId }) {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const peer = new Peer(); // Use your own PeerJS API key here if applicable

    peer.on('open', (id) => {
      console.log('Viewer peer ID is: ' + id);
      const conn = peer.connect(broadcasterPeerId);

      conn.on('open', () => {
        console.log('Connected to the broadcaster');

        // Receive the broadcaster's webcam stream
        peer.on('call', (call) => {
          call.answer();
          call.on('stream', (remoteStream) => {
            setStream(remoteStream);
          });
        });
      });
    });

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      peer.destroy();
    };
  }, [broadcasterPeerId]);

  return (
    <div>
      {!stream ? (
        <p>Waiting for stream...</p>
      ) : (
        <video ref={videoRef} srcObject={stream} autoPlay playsInline muted style={{ display: 'block', maxWidth: '100%' }} />
      )}
    </div>
  );
}

export default Livestream;
