
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Livestream from './components/Livestream';
import Webcam from './components/Webcam';
import Header from './Header';



function App() {
  return (
    <div className="App">
      <Header/>
  <Routes>
    
    <Route path=''  element={<Webcam/>}/>
    <Route path='livestream'  element={<Livestream/>}/>
  </Routes>
    </div>
  );
}

export default App;
