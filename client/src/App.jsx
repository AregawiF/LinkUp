import './App.css';
import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {
  useEffect(() => {
    // Check socket connection
    socket.on('connect', () => {
      console.log(`Connected to server with ID: ${socket.id}`);
    });

    socket.on('receive_message', (data) => {
      console.log('Received message:', data);
    });

    // Cleanup the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Welcome to LinkUp Chat</h1>
    </div>
  );
}

export default App;
