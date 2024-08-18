// UserInfo.js
import React from 'react';

const UserInfo = ({ user }) => {
  return (
    <div>
      <img src={user.picture} alt="Profile" />
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Location: {user.location}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default UserInfo;
