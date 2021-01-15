import React, { useEffect } from 'react';
import socketClient from 'socket.io-client';

const StudentPage = () => {
  const endpoint = 'http://localhost:5000';
  const socket = socketClient(endpoint);

  useEffect(() => {
    socket.on('connection', () => {
      console.log('connect to backend');
    });
    socket.on('message', ({ message }) => {
      console.log(message);
    });
  }, [socket]);

  return (
    <div>
      <h1>Welcome Student Name</h1>
      <div>
        {/* Avatar Image  */}
        <img src='https://via.placeholder.com/150' alt='placeholder blank' />
        <button>Change Avatar</button>
      </div>
      <div>
        <p>ClassRoom Name: Teacher Name</p>
        <p>Points Earned: 0 </p>
      </div>
    </div>
  );
};

export default StudentPage;
