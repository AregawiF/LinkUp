import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForms from './components/authForms';
import PrivateRoute from './components/privateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthForms />} />
        <Route path="/register" element={<AuthForms />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <div>Welcome to your dashboard!</div>
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;


// import './App.css';
// import { useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3001');

// function App() {
//   useEffect(() => {
//     // Check socket connection
//     socket.on('connect', () => {
//       console.log(`Connected to server with ID: ${socket.id}`);
//     });

//     socket.on('receive_message', (data) => {
//       console.log('Received message:', data);
//     });


//     // Cleanup the socket connection on component unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div>
//       <h1 className='text-2xl'>Welcome to LinkUp Chat</h1>
//     </div>
//   );
// }

// export default App;

