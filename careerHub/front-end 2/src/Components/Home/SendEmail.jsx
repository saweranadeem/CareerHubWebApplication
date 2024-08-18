import React from 'react';


const SendEmail = () => {

  const sendEmailsToAllUsers = async () => {
    try {
      console.log("Sending request to send emails");
      const response = await fetch('http://localhost:3000/send-mails', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
     } 
    });
  
      console.log("Response received:", response);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send emails');
      }
  
      const responseData = await response.json();
      alert(responseData.message); // Display success message
    }
     catch (error) {
      console.error('Error:', error.message);
      alert('Error: Failed to send emails');
    } 
  };
  
  return (
    <div>
     <button className='bg-primary text-white py-2 px-6 rounded md:ml-8 hover:bg-orange-400 duration-500 cursor-pointer' onClick={sendEmailsToAllUsers} >
        Send Emails
      </button>
    </div>
  );
};

export default SendEmail;



