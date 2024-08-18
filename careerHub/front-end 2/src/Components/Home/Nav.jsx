import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';
import { FaUserCircle } from 'react-icons/fa'; 
import logo from '../../assets/logo.png';

const Nav = () => {
  const Links = [
    { name: "Home", link: "/" },
    { name: "Counselling", link: "/counselling" },
    { name: "Learning", link: "/learning" },
    { name: "Jobs", link: "/jobs" },
    { name: "About us", link: "/about-us" }
  ];

  const auth = JSON.parse(localStorage.getItem('user'));
  const userId = auth?._id; 
  const navigate = useNavigate();
  const location = useLocation();

  const [activeLink, setActiveLink] = useState('/'); 
  const [openProfile, setOpenProfile] = useState(false); 

  useEffect(() => {
    setActiveLink(location.pathname); 
  }, [location]);

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const toggleProfileDropdown = () => {
    setOpenProfile(!openProfile);
  };

  return (
    <div className='shadow-md w-full fixed top-0 left-0 z-[1001]'>
      <div className='md:flex items-center justify-between bg-white py-3 md:px-10 px-7'>
        <div className='font-bold text-2xl cursor-pointer flex items-center text-gray-800'>
          <span className='text-orange-400'>
            <img src={logo} alt="CareerHub Logo" className="w-14 h-12 items-center inline-block rounded-full" />
          </span>
          <a href='/'>CareerHub</a>
        </div>

        {auth && (
          <>
            <ul className='hidden md:flex md:items-center md:pb-0 space-x-8'>
              {Links.map((link) => (
                <li key={link.name} className='text-lg'>
                  <a 
                    href={link.link} 
                    className={`relative text-primary font-semibold cursor-pointer hover:text-tertiary duration-500 ${activeLink === link.link ? 'active' : ''}`}
                    onClick={() => setActiveLink(link.link)}
                  >
                    {link.name}
                    {activeLink === link.link && (
                      <span className='absolute left-0 bottom-[-2px] w-full h-[3px] bg-orange-400 rounded-full mt-1'></span>
                    )}
                  </a>
                </li>
              ))}
              <div className='relative'>
                <button onClick={toggleProfileDropdown} className='flex items-center text-primary hover:text-tertiary'>
                  {auth.profilePicture ? (
                    <img
                      src={auth.profilePicture}
                      alt="Profile"
                      className='rounded-full w-8 h-8 object-cover'
                    />
                  ) : (
                    <FaUserCircle className='text-3xl' />
                  )}
                  <span className='ml-2'>{auth.name}</span> 
                  <ion-icon name={openProfile ? 'chevron-up' : 'chevron-down'} className='text-xl text-gray-700 ml-2'></ion-icon>
                </button>
                {openProfile && (
                  <ul className='absolute right-0 mt-2 py-2 w-48 bg-white shadow-md rounded-lg border border-gray-200 z-10'>
                    <li className='hover:bg-gray-100'>
                      <a href={`/profile/${userId}`} className='block px-4 py-2 text-sm text-gray-700 hover:text-primary'>Profile</a>
                    </li>
                    <li className='hover:bg-gray-100'>
                      <button onClick={logout} className='block px-4 py-2 text-sm text-gray-700 hover:text-primary'>Logout</button>
                    </li>
                  </ul>
                )}
              </div>
            </ul>

            <div className='md:hidden flex items-center justify-between w-full'>
              <div className='flex-grow'></div>
              <button onClick={toggleProfileDropdown} className='flex items-center text-primary hover:text-tertiary'>
                {auth.profilePicture ? (
                  <img
                    src={auth.profilePicture}
                    alt="Profile"
                    className='rounded-full w-8 h-8 object-cover cursor-pointer'
                  />
                ) : (
                  <FaUserCircle className='text-3xl cursor-pointer' />
                )}
              </button>
            </div>
            {openProfile && (
              <div className='md:hidden w-1/2 float-right h-2'>
                <ul className='mt-2 py-2 w-full bg-white shadow-md rounded-lg border border-gray-200'>
                  <li className='px-4 py-2 border-b border-gray-200'>
                    <a href={`/profile/${userId}`} className='block text-sm text-gray-700 hover:text-primary'>View Profile</a>
                  </li>
                  {Links.map((link) => (
                    <li key={link.name} className='px-4 py-2 border-b border-gray-200'>
                      <a 
                        href={link.link} 
                        className={`block text-sm text-gray-700 hover:text-primary ${activeLink === link.link ? 'underline' : ''}`}
                        onClick={() => setActiveLink(link.link)}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                  <li className='px-4 py-2'>
                    <button onClick={logout} className='block text-sm text-gray-700 hover:text-primary'>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </>
        )}

        {!auth && (
          <div className='flex md:flex-row gap-4 md:gap-0 flex-col md:ml-8 w-max'>
            <Button><a href='/login'>Login</a></Button>
            <Button><a href='/signup'>SignUp</a></Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
