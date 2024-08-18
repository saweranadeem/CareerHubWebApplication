import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

// Function to check if the user is logged in
const isLoggedIn = () => {
  return localStorage.getItem("token") !== null;
};

export default function Modal() {
  const location = useLocation(); // Get the current location
  const [showModal, setShowModal] = useState(
    !isLoggedIn() && (location.pathname === "/" || location.pathname === "")
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Close modal after form submission
    setShowModal(false);
  };

  useEffect(() => {
    // Lock scrolling when the modal is open
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup effect
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  return (
    <div className="">
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm z-[1]">
          <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-md ">
            <div className="">
              <span
                className="cursor-pointer absolute top-0 right-0"
                onClick={() => setShowModal(false)}
              >
                <FaTimes className="text-xl text-gray-500 mt-2 mr-2 hover:text-gray-800" />
              </span>
              <h2 className="text-center text-primary font-bold text-xl mb-4">
                Latest Updates
              </h2>
              <div>
                <ul className="text-center font-bold text-lg text-white">
                  <li className="bg-[#F08784] px-4 py-3 hover:bg-purple-900">
                    <a
                      href="https://techxplore.com/news/2024-08-tool-fake-ai-scientific-articles.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                     New tool detects fake, AI-produced scientific articles
                    </a>
                  </li>
                  <li className="bg-[#c973d1] px-4 py-3 hover:bg-green-900">
                    <a
                      href="https://techxplore.com/news/2024-08-code-life-ai-dna-hidden.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Cracking the code of life: New AI model learns DNA's hidden language
                    </a>
                  </li>
                  <li className="bg-[#F09B59] px-4 py-3 hover:bg-[#ce8333]">
                    <a
                      href="https://technologytimes.pk/2024/06/28/alarming-number-of-analyzed-passwords-easy-to-crack-kaspersky/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                     Kaspersky Study: Alarming Number of Passwords Easy to Crack
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
