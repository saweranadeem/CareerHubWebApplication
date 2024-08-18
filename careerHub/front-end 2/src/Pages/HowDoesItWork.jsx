import React from "react";
import { FaUserPlus, FaSearch, FaCommentDots, FaGraduationCap, FaCertificate } from "react-icons/fa";
import Nav from "../Components/Home/Nav";
import Footer from "../Components/Home/Footer";

const HowDoesItWork = () => {
  return (
    <div>
      <Nav />
      <div className="text-white min-h-screen mt-16 mb-20 p-8">
        <div className="max-w-5xl mx-auto bg-white text-gray-900 shadow-2xl rounded-lg overflow-hidden">
          <div className="p-5">
            <h1 className="text-3xl font-bold text-orange-400 text-center">How Does It Work?</h1>
            <p className="text-center mt-2 text-primary text-base">Your guide to using CareerHub effectively.</p>
          </div>

          <div className="px-8 pt-4 space-y-8">
            {/* Sign Up and Create Your Profile */}
            <section className="flex items-start space-x-3">
              <FaUserPlus className="text-primary text-xl" />
              <div>
                <h2 className="text-xl font-semibold text-primary">1. Sign Up and Create Your Profile</h2>
                <ul className="list-square ml-6 py-2 space-y-1 text-sm">
                  <li><strong>Sign Up:</strong> Create a free account using your email address.</li>
                  {/* <li><strong>Build Your Profile:</strong> Fill out your profile with personal information, educational background, work experience, skills, and career interests.</li> */}
                </ul>
              </div>
            </section>

            {/* Explore the Job Portal */}
            <section className="flex items-start space-x-3">
              <FaSearch className="text-primary text-xl" />
              <div>
                <h2 className="text-xl font-semibold text-primary">2. Explore the Job Portal</h2>
                <ul className="list-square ml-6 py-2 space-y-1 text-sm">
                  <li><strong>Search for Jobs:</strong> Use advanced filters to find job openings that match your skills and interests.</li>
                  <li><strong>Apply with Ease:</strong> Apply directly through CareerHub, with your profile and resume sent to the employer.</li>
                </ul>
              </div>
            </section>

            {/* Get Personalized Career Counseling */}
            <section className="flex items-start space-x-3">
              <FaCommentDots className="text-primary text-xl" />
              <div>
                <h2 className="text-xl font-semibold text-primary">3. Get Personalized Career Counseling</h2>
                <ul className="list-square ml-6 py-2 space-y-1 text-sm">
                  <li><strong>Chat with Our AI-Powered Career Counselor:</strong> Receive personalized career advice 24/7.</li>
                  <li><strong>Receive Tailored Recommendations:</strong> Get suggestions for jobs, courses, and resources based on your profile and interactions.</li>
                </ul>
              </div>
            </section>

            {/* Enhance Your Skills with Online Courses */}
            <section className="flex items-start space-x-3">
              <FaGraduationCap className="text-primary text-xl" />
              <div>
                <h2 className="text-xl font-semibold text-primary">4. Enhance Your Skills with Online Courses</h2>
                <ul className="list-square ml-6 py-2 mb-6 space-y-1 text-sm">
                  <li><strong>Browse Courses:</strong> Explore a variety of skill development courses.</li>
                  <li><strong>Learn at Your Own Pace:</strong> Enroll and study anytime, anywhere.</li>
                  {/* <li><strong>Earn Certifications:</strong> Add completed course certificates to your profile to boost visibility to employers.</li> */}
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HowDoesItWork;
