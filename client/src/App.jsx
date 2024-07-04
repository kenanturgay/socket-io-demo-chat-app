
import { useState } from "react";
import "./App.css";
import Chat from './components/Chat';
import Room from './components/Room';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');
function App() {

  const [room, setRoom] = useState('');
  const [username, setUsername] = useState('');
  const [chatScreen, setChatScreen] = useState(false);
  return (
    <div className="App">
      {!chatScreen ?
        <Room username={username} setUsername={setUsername} room={room} setRoom={setRoom} setChatScreen={setChatScreen} socket={socket} /> :
        <Chat socket={socket} room={room} username={username} />}
    </div>
  );
}

export default App;
