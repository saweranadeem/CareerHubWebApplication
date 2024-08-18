import React, { useState } from 'react';
import axios from 'axios';
import Nav from "./Nav";
import Footer from "./Footer";

const Unsubscribe = () => {
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState('');

  const handleUnsubscribe = async () => {
    try {
      // Call your backend API to unsubscribe the user
      const response = await axios.delete('http://localhost:3000/unsubscribe', { data: { email } });
      if (response.status === 200) {
        setNotification(response.data.message);
        // Show notification in alert box
        alert(response.data.message);
      } else {
        setNotification('Error: Enter correct email');
        // Show notification in alert box
        alert('Error: Enter correct email.');
      }
    } catch (error) {
      // setNotification('Error: Enter correct email.');
      // Show notification in alert box
      alert('Error: Enter correct email.');
    }
    // Clear input field
    setEmail('');
  };

  return (
    <div>
       <Nav />
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col space-y-4">
            <input
              type="email"
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-orange-300 transition-colors duration-300"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-primary text-white font-semibold px-4 py-2 rounded hover:bg-orange-300 focus:outline-none focus:bg-orange-300 transition-colors duration-300"
              onClick={handleUnsubscribe}
            >
              Unsubscribe
            </button>
          </div>
        </div>

      </div>
      <Footer />
    </div>

  );
};

export default Unsubscribe;
