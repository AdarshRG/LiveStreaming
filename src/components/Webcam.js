import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Peer from 'peerjs';

function Webcam({ onPeerId }) {
  const [peer, setPeer] = useState(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const initPeer = async () => {
      try {
        const peer = new Peer(); // Use your own PeerJS API key here if applicable
        setPeer(peer);

        peer.on('open', (id) => {
          console.log('Broadcaster peer ID is: ' + id);
          onPeerId(id); // Send the broadcaster's peer ID to the parent component
        });

        peer.on('call', (call) => {
          call.answer(stream);
          call.on('stream', (remoteStream) => {
            // Handle the remote stream if needed
          });
        });
      } catch (error) {
        console.error('Error initializing PeerJS:', error);
      }
    };

    initPeer();

    return () => {
      if (peer) {
        peer.destroy();
      }
    };
  }, [stream, onPeerId]);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = document.getElementById('webcam');
      if (videoElement) {
        videoElement.srcObject = stream;
        setStream(stream);

        if (peer) {
          const call = peer.call('livestream', stream);
          call.on('stream', (remoteStream) => {
            // Handle the remote stream if needed
          });
        }
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const stopWebcam = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setStream(null);
    }
  };

  return (
    <div>
      {!stream ? (
        <Button variant="danger" onClick={startWebcam}>
          Start Webcam
        </Button>
      ) : (
        <Button variant="danger" onClick={stopWebcam}>
          Close Webcam
        </Button>
      )}
      <video id="webcam" autoPlay playsInline muted style={{ display: 'block', maxWidth: '100%' }} />
    </div>
  );
}

export default Webcam;
