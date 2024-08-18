import React from "react";
import Nav from "../Components/Home/Nav"; // Import Nav component
import Footer from "../Components/Home/Footer"; // Import Footer component

const WhyCareerHub = () => {
  return (
    <div>
      <Nav /> {/* Add Nav component at the top */}
      <div className="text-white min-h-screen mt-36 mb-20 p-8">
        <div className="max-w-5xl mx-auto bg-white text-gray-900 shadow-2xl rounded-lg overflow-hidden">
          <div className="p-5">
            <h1 className="text-3xl font-bold text-orange-400 text-center">Why CareerHub?</h1>
            <p className="text-center mt-2 text-primary text-base">CareerHub is designed with you in mind.</p>
          </div>

          <div className="px-8 pt-4 space-y-8">
            <section className="space-y-4 px-8 pt-4">
              <ul className="list-disc ml-6 space-y-2 text-sm mb-12 text-gray-900">
                <li><strong>User-Friendly Interface:</strong> Our platform is easy to navigate, ensuring that you can focus on what matters most – your career.</li>
                <li><strong>Comprehensive Support:</strong> From job searching to skill development, CareerHub offers everything you need to succeed in one place.</li>
                <li><strong>Secure and Confidential:</strong> We take your privacy seriously and ensure that your data is protected at all times.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
      <Footer /> {/* Add Footer component at the bottom */}
    </div>
  );
};

export default WhyCareerHub;
