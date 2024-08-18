import React from 'react'
import '../styles/UserList.css'
import Image2 from '../assets/Image2.jpg'

const users= [
    {
        name: 'John Doe',
        image: Image2,
        duration: '$20/hr',
        location: 'New York',
        cost: '3+ Year experience',

    }
]
const UserList = () => {
  return (
    <div className='user--list'>
        <div className='list--header'>
            <h2>Users</h2>
            <select>
                <option value="english">English</option>
                <option value="english">French</option>
                <option value="english">German</option>
            </select>
        </div>
        <div className="list--container">
            {users.map(user => 
              <div className='list'>
                <div className='user--detail'>
                  <img  src={user.image} alt={user.name} />
                  <h2>{user.name}</h2>
                  <span>{user.duration}</span>
                  <span>{user.cost}</span>


                </div>
              </div>
            )}
        </div>
    </div>
  ) 
};

export default UserList;