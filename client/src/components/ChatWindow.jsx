// ChatWindow.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMessagesQuery, useSendMessageMutation } from '../api/messageApi';
import { useSocket } from './SocketContext';

const ChatWindow = () => {
  const { roomId } = useParams();  // Assume roomId is passed in the URL
  const { data: messages, isLoading } = useGetMessagesQuery(roomId);
  const [sendMessage] = useSendMessageMutation();
  const [message, setMessage] = useState('');
  const socket = useSocket();


  useEffect(() => {
    if (socket) {
      // Join the room when component mounts
      socket.emit('join_room', roomId);

      // Listen for incoming messages
      socket.on('receive_message', (newMessage) => {
        console.log('Received new message:', newMessage);
        // Handle received message, you might want to update state or re-fetch messages
      });

      // Clean up when the component unmounts
      return () => {
        socket.emit('leave_room', roomId);
        socket.off('receive_message'); // Remove listener when component unmounts
      };
    }
  }, [roomId, socket]);

  const handleSend = async () => {
    if (message.trim()) {
      // Send message through RTK Query mutation
      await sendMessage({ content: message, roomId });

      // Emit message through socket to other users in the room
      socket.emit('send_message', { content: message, roomId });
      setMessage(''); // Clear input after sending message
    }
  };

  if (isLoading) return <p>Loading messages...</p>;

  return (
    <div>
      <div>
        {messages?.map((msg) => (
          <div key={msg._id}>
            <p>{msg.sender.username}: {msg.content}</p>
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
