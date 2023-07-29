import { Button } from 'react-bootstrap';
import React, { useState } from 'react';


function Webcam() {
  const [stream, setStream] = useState(null);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = document.getElementById('webcam');
      if (videoElement) {
        videoElement.srcObject = stream;
        setStream(stream);
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
          <Button variant="danger"onClick={startWebcam}>Start Webcam</Button>
       
      ) : (
        <Button variant="danger"onClick={stopWebcam}>Close Webcam</Button>
      )}
      <video id="webcam" autoPlay playsInline muted style={{ display: 'block', maxWidth: '100%' }} />
    </div>
  );
}

export default Webcam;

