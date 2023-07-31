import Peer from "peerjs";
import React, { useEffect, useRef, useState } from "react";


function Webcam() {
  const [peerId, setPeerId] = useState("");
  const remoteVideoRef = useRef(null);
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const peerInstance = useRef(null);
  const currentUserVideoRef=useRef(null)
  useEffect(() => {
    const peer = new Peer();
    peer.on("open", (id)=> {
      setPeerId(id);
    });
    peer.on("call", (call) => {
      var getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
      getUserMedia({ video: true }, (mediaStream) => {
        currentUserVideoRef.current.srcObject=mediaStream
        currentUserVideoRef.current.play()
        call.answer(mediaStream);
        call.on("stream",function(remoteStream){
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play()
        })
      });
    });
    peerInstance.current = peer;
  }, []);

  const call = (remotePeerId) => {
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
    getUserMedia({ video: true }, (mediaStream) => {
        currentUserVideoRef.current.srcObject=mediaStream
        currentUserVideoRef.current.play()
      const call = peerInstance.current.call(remotePeerId, mediaStream);
      call.on("stream", (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play()
      });
    });
  };
console.log(peerId);
  return (
    <div>
        <h3>Current User id: {peerId}</h3>
      <input
        type="text"
        value={remotePeerIdValue}
        onChange={(e) => setRemotePeerIdValue(e.target.value)}
      />
      <button onClick={() => call(remotePeerIdValue)}>Call</button>
      <div>
        <video ref={currentUserVideoRef} />
      </div>
      <div>
        <video ref={remoteVideoRef} />
      </div>
    </div>
  );
}

export default Webcam;
