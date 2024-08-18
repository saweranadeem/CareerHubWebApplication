import react from 'react';
import {BiBookAlt, BiHome, BiMessage, BiSolidReport, BiStats, BiTask, BiHelpCircle, BiUserCheck} from 'react-icons/bi';
import { Link, NavLink } from 'react-router-dom';
import '../styles/sidebar.css';
 const SideBar = () => {
    return <div className='menu'>
        <div className='logo'>
            <BiBookAlt className='logo-icon'/>
            <h2>EduFlex</h2>
        </div>
        <div className='menu--list'>
            
            <Link to='/my-job' className='item hover:bg-sky-700'>
                <BiSolidReport className='icon'/>
                Jobs Posted
            </Link>
            <a href='#' className='item hover:bg-sky-700'>
                <BiUserCheck className='icon'/>
                Skils
            </a>
            <a href='#' className='item hover:bg-sky-700'>
                <BiHelpCircle className='icon'/>
                Help
            </a>
        </div>
    </div>;
 };

export default SideBar;