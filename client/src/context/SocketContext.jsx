import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

// Create a Context for Socket
const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket when the component mounts
    const socketConnection = io('http://localhost:3001'); // Change to your server URL
    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect(); // Disconnect when the component unmounts
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
