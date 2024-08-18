import React from 'react'
import mission from '../assets/mission.jpg';
import offer from '../assets/offer.jpg';
import vision from '../assets/vision.jpg';
import team from '../assets/team.jpg';
import Nav from "../Components/Home/Nav"
import Footer from  "../Components/Home/Footer"
const About = () => {
    return (
        <div>
          <Nav />
          <div className="container mx-auto px-10 py-24 md:mt-0 mt-10">
          <div className='flex flex-col items-center mb-12'>
            <h1 className="text-4xl font-bold mb-8 text-orange-400 ">About Us</h1>
              <p>
                Welcome to CareerHub, your one-stop solution for building a successful career in today's competitive job market. We are dedicated to empowering students and young professionals by providing them with the tools, guidance, and resources they need to make informed career choices, develop essential skills, and connect with potential employers.
              </p>
          </div>
          <div className="flex flex-col md:flex-row items-center mb-12">
            <div className="md:w-1/2 lg:w-1/3 p-4">
              <img
                src={mission}
                alt="Job Platform"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 lg:w-2/3 p-4">
              <h1 className="text-3xl font-bold mb-4 text-orange-400">Our Mission</h1>
              <p className="text-lg mb-4">
              At CareerHub, our mission is to bridge the gap between education and employment. We strive to:
              </p>
              <p className="text-lg mb-4">
              Empower students with the knowledge and skills needed to excel in their chosen careers, Connect job seekers with employers, making the hiring process smoother and more efficient, and Guide individuals through personalized career counselling and mentorship.
              </p>
            </div>
          </div>
    
          <div className="flex flex-col md:flex-row items-center mb-12">
            <div className="md:w-1/2 lg:w-2/3 p-4">
              <h1 className="text-3xl font-bold mb-4 text-orange-400">What We Offer</h1>
              <p className="text-lg mb-4">
             Job Portal: Find your dream job through our comprehensive job portal, where we connect you with top employers in various industries. Whether you're a fresh graduate or an experienced professional, CareerHub has the right opportunities for you.
              </p>
              <p className="text-lg mb-4">
              Career Counselling Chabot: Unsure about your career path? Our AI-powered Chabot is here to help. Get personalized advice, explore different career options, and receive guidance on how to achieve your career goals..
              </p>
              <p className="text-lg mb-4">
              Skill Development Courses: Enhance your skills and stay ahead in the job market with our range of online courses. From technical skills to soft skills, CareerHub offers courses that cater to the demands of today’s employers.
              </p>
            </div>
            <div className="md:w-1/2 lg:w-1/3 p-4">
              <img
                src={offer}
                alt="Our Values"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center mb-12">
            <div className="md:w-1/2 lg:w-1/3 p-4">
              <img
                src={vision}
                alt="Job Platform"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 lg:w-2/3 p-4">
              <h1 className="text-3xl font-bold mb-4 text-orange-400">Our Vision</h1>
              <p className="text-lg mb-4">
              We envision a future where every student and professional has access to the right opportunities, skills, and guidance to achieve their career aspirations. At CareerHub, we are committed to creating a platform that not only helps individuals find jobs but also supports their ongoing career development.
              </p>
              
            </div>
          </div>
    
          <div className="flex flex-col md:flex-row items-center mb-12">
            <div className="md:w-1/2 lg:w-2/3 p-4">
              <h1 className="text-3xl font-bold mb-4 text-orange-400">Meet the Team</h1>
              <p className="text-lg mb-4">
              CareerHub is brought to you by a passionate team of students and professionals who are committed to making a difference in the career journeys of young individuals. Our team combines expertise in technology, career counseling, and education to create a platform that truly meets the needs of today’s job seekers.
              </p>
              
            </div>
            <div className="md:w-1/2 lg:w-1/3 p-4">
              <img
                src={team}
                alt="Our Values"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
        <Footer />
        </div>
      );
}

export default About;