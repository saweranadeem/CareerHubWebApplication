import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'tailwindcss/tailwind.css';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userType, setUserType] = useState("student"); // default is student
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate('/');
        }
    }, [navigate]);

    const validateForm = () => {
        let isValid = true;

        if (!name.trim()) {
            setNameError("Please enter your name");
            isValid = false;
        } else {
            setNameError("");
        }

        if (!email.trim()) {
            setEmailError("Please enter your email");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Please enter a valid email address");
            isValid = false;
        } else {
            setEmailError("");
        }

        if (!password.trim()) {
            setPasswordError("Please enter your password");
            isValid = false;
        } else if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long");
            isValid = false;
        } else if (!/(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z])/.test(password)) {
            setPasswordError("Password must contain at least one number, one uppercase letter, and one special character");
            isValid = false;
        } else {
            setPasswordError("");
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
            isValid = false;
        } else {
            setConfirmPasswordError("");
        }

        return isValid;
    };

    const checkEmailExists = async () => {
        try {
            const response = await fetch('http://localhost:3000/check-email', {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Failed to check email. Please try again later.');
            }

            const data = await response.json();

            if (data.success) {
                setEmailError("Email already exists");
                return true;
            } else if (data.message === 'Email does not exist') {
                setEmailError("");
                return false;
            } else {
                throw new Error('Unexpected response from the server');
            }
        } catch (error) {
            setError('Error checking email. Please try again later.');
            return false;
        }
    };

    const CollectData = async () => {
        try {
            if (!validateForm()) {
                return;
            }
            setError(""); // Clear any previous error messages

            const emailExists = await checkEmailExists();
            if (emailExists) {
                return;
            }

            let result = await fetch('http://localhost:3000/register', {
                method: 'POST',
                body: JSON.stringify({ name, email, password, userType }), // remove confirmPassword
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!result.ok) {
                throw new Error('Failed to register. Please try again later.');
            }
            result = await result.json();
            navigate('/');
            localStorage.setItem("user", JSON.stringify(result.result));
            localStorage.setItem("token", JSON.stringify(result.auth));
        } catch (error) {
            console.error('Error registering:', error);
            // Handle error appropriately, e.g., show a message to the user
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-[400px] p-12 pt-[20px] rounded-md shadow-md bg-primary">
                <h3 className="text-2xl font-semibold mb-4 text-center text-white">Sign Up</h3>

                {nameError && <p className="error text-red-500">{nameError}</p>}
                <div className="relative mb-4">
                    <span className="absolute left-3 top-3 text-gray-500"><i className="fas fa-user"></i></span>
                    <input
                        className="pl-10 inputBox w-full p-2 border border-orange-300 rounded-md focus:ring-orange-200 focus:border-orange-200"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                    />
                </div>
                
                {emailError && <p className="error text-red-500">{emailError}</p>}
                <div className="relative mb-4">
                    <span className="absolute left-3 top-3 text-gray-500"><i className="fas fa-envelope"></i></span>
                    <input
                        className="pl-10 inputBox w-full p-2 border border-orange-300 rounded-md focus:ring-orange-200 focus:border-orange-200"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                    />
                </div>
                
                {passwordError && <p className="error text-red-500">{passwordError}</p>}
                <div className="relative mb-4">
                    <span className="absolute left-3 top-3 text-gray-500"><i className="fas fa-lock"></i></span>
                    <input
                        className="pl-10 inputBox w-full p-2 border border-orange-300 rounded-md focus:ring-orange-200 focus:border-orange-200"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                    />
                </div>
                
                {confirmPasswordError && <p className="error text-red-500">{confirmPasswordError}</p>}
                <div className="relative mb-4">
                    <span className="absolute left-3 top-3 text-gray-500"><i className="fas fa-lock"></i></span>
                    <input
                        className="pl-10 inputBox w-full p-2 border border-orange-300 rounded-md focus:ring-orange-200 focus:border-orange-200"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                    />
                </div>

                <button
                    className="w-full p-3 ml-[5px] font-semibold text-base text-white bg-orange-400 rounded-md hover:bg-orange-500"
                    onClick={CollectData}
                    type="button"
                >
                    Sign Up
                </button>

                <div className="mt-4 text-white flex justify-center">
                    <p>Already Have Account? <a href="/login" className="text-orange-400 justify-">Login</a></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
