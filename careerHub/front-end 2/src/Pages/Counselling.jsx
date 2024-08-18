import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Counselling = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('user'); // Check local storage for authentication status

        if (isAuthenticated) {
            // Redirect to the external site
            window.location.href = 'https://chatbot-app-dngjr5x3xyp6vtnk4cq4hp.streamlit.app/';
        } else {
            // Redirect to the login page
            navigate('/login');
        }
    }, [navigate]);

    return null; // This component does not render anything
};

export default Counselling;
