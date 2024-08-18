import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import logo from '../../assets/logo.png';
import insta from '../../assets/insta.png';
import linkedin from '../../assets/linkedin.png';
import facebook from '../../assets/facebook.png';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === '' || !/\S+@\S+\.\S+/.test(email)) {
      setIsEmailValid(false);
      return; // Exit early if email is not valid
    }
    try {
      const response = await fetch('http://localhost:3000/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setError('');
        setEmail('');
        alert(data.message); // Display success message in alert box
      } else {
        setMessage('');
        setError(data.error);
        alert(data.error); // Display error message in alert box
      }
    } catch (error) {
      setError('An error occurred while subscribing.');
      setMessage('');
      setEmail('');
      alert('An error occurred while subscribing.'); // Display generic error message in alert box
    }
  };

  return (
    <div className='gradientBg md:px-14 p-3 max-w-screen-2xl mx-auto text-white'>
      <div className='my-8 flex flex-col md:flex-row gap-10'>
        <div className='md:w-1/3 space-y-8'>
          <Link to="/" className="text-2xl font-semibold items-center flex space-x-2 text-orange-500">
            <img src={logo} alt="" className="w-14 items-center inline-block rounded-full" />
            <span className='text-white'>CareerHub</span>
          </Link>
          <p className='md:w-2/3 text-base font-semibold'>A Gateway to Guided Career Exploration, Educational, Opportunities, and Professional Growth</p>

          <div>
            <h2 className='text-lg font-semibold mb-2 text-white'>Subscribe to our latest news</h2>
            {!isEmailValid ? <p>Please enter a valid email address</p> : null}
            <form onSubmit={handleSubmit} className='md:flex'>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleInputChange}
                required className='bg-white text-primary py-2 px-4 w-[60%] rounded-md focus:outline-none'
              />
              <button type='submit' className='px-4 py-2 bg-orange-400 text-white rounded-md -ml-2 
            cursor-pointer hover:bg-primary duration-300 transition-all'>Subscribe </button>
            </form>
          </div>
        </div>

        {/* Footer navigation */}
        <div className='md:w-2/3 flex flex-col md:flex-row flex-wrap justify-between items-start pl-2 gap-8 '>
          <div className='space-y-4 mt-5'>
            <h4 className='text-xl font-extrabold'>Platform</h4>
            <ul className='space-y-3 font-medium'>
              <Link to='/' className='block hover:text-orange-500'>Home</Link>
              <a href='/counselling' className='block hover:text-orange-500'>Counselling</a>
              <a href='/learning' className='block hover:text-orange-500'>Learning</a>
              <Link to='/jobs' className='block hover:text-orange-500'>Jobs</Link>
            </ul>
          </div>
          <div className='space-y-4 mt-5'>
            <h4 className='text-xl font-extrabold'>Resources</h4>
            <ul className='space-y-3 font-medium'>
              <Link to='/why-CareerHub' className='block hover:text-orange-500'>Why CareerHub?</Link>
              <Link to='/how-does-it-work' className='block hover:text-orange-500'>How does it work?</Link>
              <Link to='/privacy-policy' className='block hover:text-orange-500'>Privacy Policy</Link>
              <Link to='/about-us' className='block hover:text-orange-500'>About us</Link>
            </ul>
          </div>
          <div className='space-y-4 mt-5'>
            <h4 className='text-xl font-extrabold'>Contacts</h4>
            <ul className='space-y-3 font-medium'>
              <p>(92) 42 000332257</p>
              <p>123 CareerHub Street, Lcwu, Jail Road</p>
              <p>lcwufyp2024@gmail.com</p>
              <p>0324-0568899</p>
            </ul>
          </div>
        </div>
      </div>

      <hr />

      <div className='flex flex-col sm:flex-row gap-8 sm:items-center justify-between mt-4'>
        <p>@ CareerHub --2024. All rights are reserved.</p>
        <div className='flex items-center space-x-4'>
          <a href="https://www.facebook.com/faiqa.asghar.10" target="_blank" rel="noopener noreferrer">
            <img src={facebook} alt="Facebook" className='w-7 cursor-pointer hover:translate-y-2 transition-all duration-300' />
          </a>

         <a href="https://www.linkedin.com/in/faiqa-asghar-0bb589203/" target="_blank" rel="noopener noreferrer">
         <img src={linkedin} alt="LinkedIn" className='w-8 cursor-pointer hover:translate-y-2 transition-all duration-300'></img>
         </a> 
         <a href="https://www.instagram.com/faiqa._asghar/" target="_blank" rel="noopener noreferrer">
         <img src={insta} alt="LinkedIn" className='w-8 cursor-pointer hover:translate-y-2 transition-all duration-300'></img>
         </a> 
        </div>
      </div>
    </div>
  )
}

export default Footer;
