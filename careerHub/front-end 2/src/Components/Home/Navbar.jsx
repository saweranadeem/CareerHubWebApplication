import { React, useState } from "react";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaXmark } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";

import { Link } from "react-scroll"
const Navbar = ({ query, HandleInputChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  // const navItems = [
  //   {link: "Overview", path: "Home"},
  //   {link: "About", path: "About"},
  //   {link: "Contact", path: "Contact"},
  //   {link: "Jobs", path: "Jobs"},
  // ]

  const navItems = [
    { path: "/", title: "Home" },
    { path: "/jobs", title: "Jobs" },
    { path: "/counselling", title: "Counselling" },
    { path: "/learning", title: "Learning" },
     { path: "/login", title: "" },
    { path: "/signup", title: "" },
  ];

  return (
    <>
      <nav className="bg-white md:px-14 p-3 max-w-screen-2xl border-b mx-auto text-primary fixed top-0 left-0 right-0">
        <div className="text-lg container max-auto flex justify-between items-center font-medium ">
          <div className="flex items-center space-x-14">
            <a
              href="/" className="text-2xl font-semibold items-center flex space-x-3 text-primary ">
              <img src={logo} alt="" className="w-12 items-center inline-block" /><span>CareerHub</span>
            </a>

            {/* maping navitems */}
            {/* <ul className="md:flex  space-x-12 hidden ">
            {
              navItems.map(({path, title}) => <Link key={title} href={path} className="block hover:text-gray-300">{title}</Link>)
            }
          </ul> */}

           <div>
             <ul className=" md:flex items-center space-x-10 hidden ">
              {navItems.map(({ path, title }) => (
                <li key={path} className="text-base text-primary">
                  <NavLink to={path} className="block hover:text-gray-400">
                    {title}
                  </NavLink>
                </li>
              ))}
            </ul>
           </div>
          </div>

          {/* right side */}
          <div className="flex md:flex-row  md:items-center  gap-6">
            {/* <Link to="/" className="hidden lg:flex hover:text-secondary items-center">
            <FaSearch  className="-mr-2" /><span> <input type="text" placeholder="Search"
             className="border border-gray-400 px-2 py-1 rounded" /></span>
            </Link> */}

            {/* search */}
            {/* <div className="hidden lg:flex items-centers ">
              <input type="text" placeholder="Search" className="border border-blue-300 pl-8 py-1.5 rounded-md shadow-sm 
             ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-400" onChange={HandleInputChange} value={query} />
              <FiSearch className="absolute mt-3 mr-5 ml-2 " />
            </div> */}
             
            <a className="bg-white text-secondary border border-secondary px-4 py-2 hover:bg-primary transition-all duration-300 rounded" href="/login">Login </a>
            
            <button className="bg-secondary text-white px-4 py-2 hover:bg-primary transition-all duration-300 rounded"><a href="/signup">Sign Up </a>
            
            </button>
          </div>

          {/* mobile menu */}
          <div className='md:hidden block'>
            <button onClick={toggleMenu}>
              {
                isMenuOpen ? <FaXmark className='text-black w-5 h-5' /> : <FaBars className='text-black w-5 h-5' />
              }
            </button>
          </div>
        </div>
      </nav>

      <div>
        <ul className={`md:hidden text-xl font-medium px-4 space-y-4 pt-24 pb-5 bg-secondary ${isMenuOpen ? "block fixed top-0 left-0 right-0" : "hidden"} `}>
          {navItems.map(({ path, title }) => (
            <li key={path} className=" text-primary ">
              <NavLink to={path} className="block text-white hover:text-gray-400 onClick={toggleMenu}">
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

    </>
  );
};

export default Navbar;
