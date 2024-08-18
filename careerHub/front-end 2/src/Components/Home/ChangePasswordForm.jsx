import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ChangePasswordForm = ({ handleChangePassword, error, success, setError, setSuccess }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const location = useLocation();

    useEffect(() => {
        // Clear error and success messages when component mounts
        setError('');
        setSuccess('');
    }, [location.pathname, setError, setSuccess]); // Dependency on pathname to clear messages on route change

    const handleSubmit = (e) => {
        e.preventDefault();
        handleChangePassword(oldPassword, newPassword, confirmPassword, () => {
            // Clear input fields after submission
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        });
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        setError(''); // Clear error message on input change
        setSuccess(''); // Clear success message on input change
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
           
            <div className="mb-4">
                <label className="block text-gray-700">Old Password</label>
                <input
                    type="password"
                    value={oldPassword}
                    onChange={handleInputChange(setOldPassword)}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">New Password</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={handleInputChange(setNewPassword)}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Confirm New Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={handleInputChange(setConfirmPassword)}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
                Change Password
            </button>
        </form>
    );
};

export default ChangePasswordForm;
