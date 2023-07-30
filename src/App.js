
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Livestream from './components/Livestream';
import Webcam from './components/Webcam';
import Header from './Header';
import { useState } from 'react';

function App() {
  const [broadcasterPeerId, setBroadcasterPeerId] = useState(null);

  const handleBroadcasterPeerId = (peerId) => {
    // Handle the broadcaster's peer ID here
    console.log('Broadcaster Peer ID:', peerId);
    setBroadcasterPeerId(peerId); // Store the broadcaster's Peer ID in the state
  };

  return (
    <div className="App">
      <Header/>
  <Routes>
    
  <Route path="/" element={<Webcam onPeerId={handleBroadcasterPeerId} />} />
        <Route path="/livestream" element={<Livestream broadcasterPeerId={broadcasterPeerId} />} />
  </Routes>
    </div>
  );
}

export default App;
