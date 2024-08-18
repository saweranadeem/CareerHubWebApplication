import React from 'react'
import ContentHeader from './ContentHeader';
import Card2 from './Card2';
import '../styles/content.css';
import UserList from './UserList';
const Content = () => {
  return (
    <div className='content'>
        <ContentHeader />
        <Card2 />
        <UserList />
    </div>
  )
};

export default Content;