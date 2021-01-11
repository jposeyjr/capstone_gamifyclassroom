import React from 'react';

const StudentPage = () => (
  <div>
    <h1>Welcome Student Name</h1>
    <div>
      {/* Avatar Image  */}
      <img
        src='https://via.placeholder.com/150'
        alt='placeholder blank image'
      />
      <button>Change Avatar</button>
    </div>
    <div>
      <p>ClassRoom Name: Teacher Name</p>
      <p>Points Earned: 0 </p>
    </div>
  </div>
);

export default StudentPage;
