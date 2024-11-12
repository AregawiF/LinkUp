import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUserDataQuery } from '../api/userApi';
import { useSearchUsersQuery, useCreateRoomMutation } from '../api/userApi';  

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

//   Fetch user data using RTK Query
  const { data: user, error, isLoading } = useGetUserDataQuery();

  // Search users
  const { data: users, isLoading: isSearching } = useSearchUsersQuery(searchQuery, {
    skip: !searchQuery, // Only fetch when there is a query
  });

  // Create a direct message room
  const [createRoom] = useCreateRoomMutation();

//   Redirect to login if there's an error (like if the token is invalid)
  useEffect(() => {
    if (error) {
        console.error('Error fetching user data:', error);
      localStorage.removeItem('token'); // Clear token if an error occurs
      navigate('/login');
    }
  }, [error, navigate]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Could not fetch user data. Please try logging in again.</p>;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUserClick = async (userToChatWith) => {
    if (user && userToChatWith) {
      // Create a new room for direct messaging
      const room = await createRoom({
        type: 'dm', // Type of room
        participants: [user._id, userToChatWith._id], // The two users involved in the DM
      });

      if (room?.data?._id) {
        navigate(`/chat/${room.data._id}`); // Redirect to the newly created chat room
      }
    }
  };

  if (isSearching) return <p>Searching for users...</p>;

  return (
    <div className="dashboard p-8">
    <h1 className="text-3xl font-bold mb-6 ml-28">Welcome, {user?.name || 'User'}!</h1>
      
    <div className=' flex justify-center'>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-3/5">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <div className='flex justify-between'>
                <div>
                    <p><strong>Name:</strong> {user?.name}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Joined:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
                </div>
                <div className=''>
                    <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/login');
                    }}
                    className="mt-8 bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                    Logout
                    </button>
                </div>
            </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        {/* Placeholder for recent activities */}
        <p>No recent activity to show.</p>
      </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-3/5">
          <h2 className="text-xl font-semibold mb-4">Search for Users</h2>
          <div className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by name"
              className="border-2 rounded-lg p-2 w-full"
            />
          </div>

          {/* Display searched users */}
          {users && users.length > 0 && (
            <div className="mt-4">
              {users.map((user) => (
                <div key={user._id} className="flex justify-between items-center mb-2">
                  <span>{user.name}</span>
                  <button
                    onClick={() => handleUserClick(user)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Message
                  </button>
                </div>
              ))}
            </div>
          )}

          {users && users.length === 0 && (
            <p>No users found for the search query.</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6 ">
            <h2 className="text-xl font-semibold mb-4">Groups & Channels</h2>
            {/* Placeholder for groups/channels */}
            <p>No groups or channels to show.</p>
        </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        {/* Placeholder for notifications */}
        <p className='text-gray-800'>No new notifications.</p>
      </div>

      
    </div>
  );
};

export default Dashboard;
