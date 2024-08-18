import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long, including numbers, special characters, and letters`;
    }
    if (!hasNumber) {
      return 'Password must contain at least one numeric character';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character';
    }
    if (!hasUppercase) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!hasLowercase) {
      return 'Password must contain at least one lowercase letter';
    }
    return null;
  };

  const handleReset = async () => {
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/reset_password/${token}`, {
        method: 'POST',
        body: JSON.stringify({ newPassword }),
        headers: {
            'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Error resetting password');
        return;
      }

      const data = await response.json();
      setSuccess(data.message);
      setNewPassword('');
      setConfirmPassword('');
      setError('');
    } catch (err) {
      setError('Error resetting password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="w-full max-w-[400px] p-12 pt-[20px] rounded-md shadow-md bg-primary">
        <h2 className="mb-4 text-2xl font-semibold text-center text-white">Reset Password</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-white" htmlFor="new-password">
            New Password
          </label>
          <input
            type="password"
            id="new-password"
            className="inputBox mb-4 w-full p-2 border border-orange-300 rounded-md focus:ring-orange-200 focus:border-orange-200"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-white" htmlFor="confirm-password">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirm-password"
            className="inputBox mb-4 w-full p-2 border border-orange-300 rounded-md focus:ring-orange-200 focus:border-orange-200"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <div className="mb-4 text-sm text-red-500">{error}</div>}
        {success && <div className="mb-4 text-sm text-green-500">{success}</div>}
        <button
          className="w-full p-3 ml-[5px] mt-[5px] font-semibold text-base text-white bg-orange-400 rounded-md hover:bg-orange-500 focus:outline-none"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
