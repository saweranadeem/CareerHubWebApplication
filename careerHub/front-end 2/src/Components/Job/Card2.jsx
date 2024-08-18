import React from 'react';
import { BiBuilding, BiLogoAndroid, BiLogoHtml5 } from 'react-icons/bi';
import './styles/sidebar.css'; // Adjust the path based on your project structure

const courses = [
  {
    title: 'Web Development',
    icon: <BiLogoHtml5 />,
    color: 'bg-blue-500',
    textColor: 'text-white',
  },
  {
    title: 'App Development',
    icon: <BiLogoAndroid />,
    color: 'bg-green-500',
    textColor: 'text-white',
  },
  {
    title: 'UI/UX',
    icon: <BiBuilding />,
    color: 'bg-yellow-500',
    textColor: 'text-gray-800',
  },
];

const Card2 = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      {courses.map((item, index) => (
        <div key={index} className={`rounded-lg overflow-hidden shadow-lg ${item.color} ${item.textColor} sidebar-item`}>
          <div className='p-6'>
            <div className='flex justify-center'>
              <div className='text-6xl'>{item.icon}</div>
            </div>
            <div className='text-center mt-4'>
              <h2 className='text-2xl font-bold'>{item.title}</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card2;
