import React from 'react'
import { useState } from 'react'
// import Navbarr from '../Components/Navbar'
import Nav from "../Components/Home/Nav"
import Footer from "../Components/Home/Footer"
import Banner from '../Components/Home/Banner'
import baner from '../assets/baner.png'
import Features from '../Components/Home/Features'
import About from '../Components/Home/About'
import Pricing from '../Components/Home/Pricing'
import NewsLetter from '../Components/Home/NewsLetter'
import NewsComponent from '../Components/Home/NewsComponent'
// import Modal from '../Components/Modal'


const Home = () => {
  const [query, setQuery] = useState('');
  const HandleInputChange = (event) => {
    setQuery(event.target.value);
  }

  return (
    
   <div>
    <Nav />
     <div className='md:px-10 px-4 max-w-screen-2xl mx-auto mt-[74px]'>
      <div>
      <Banner baner={baner} heading={'Develope your skills without diligence'} subheading={'Explore top job opportunities and advance your career. Upgrade your skills with our expert courses today!'}
        btn1={'Get Started'} btn2={'Learn More'} />
      <NewsComponent />
      {/* <News/> */}
      <Features />
      <About />
      {/* <Pricing /> */}
      {/* <NewsLetter></NewsLetter> */}
      </div>
    </div>
    <Footer />
   </div>
  )
}
export default Home