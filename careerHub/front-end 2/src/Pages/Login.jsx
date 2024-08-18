import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'tailwindcss/tailwind.css';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [error, setError] = useState("");
    const [resetError, setResetError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, [navigate]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        setError("");
        if (!email || !password) {
            setError("Please enter both email and password");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email");
            return;
        }

        try {
            let result = await fetch('http://localhost:3000/login', {
                method: 'post',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            result = await result.json();
            if (result.auth) {
                localStorage.setItem("user", JSON.stringify(result.user));
                localStorage.setItem("token", JSON.stringify(result.auth));
                navigate('/');
            } else {
                setError("Invalid email or password");
            }
        } catch (error) {
            setError("Error logging in. Please try again.");
        }
    };

    const handleForgotPassword = async () => {
        setResetError("");
        if (!resetEmail) {
            setResetError("Please enter your email");
            return;
        }

        if (!validateEmail(resetEmail)) {
            setResetError("Please enter a valid email");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/forgot_password', {
                method: 'POST',
                body: JSON.stringify({ email: resetEmail }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const result = await response.json();
            if (response.status === 200) {
                alert("Reset password email sent");
                setIsModalOpen(false);
                setResetEmail("");
            } else {
                setResetError(result.error || "Error sending reset email");
            }
        } catch (error) {
            setResetError("Error sending reset email. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-[400px] p-12 pt-[20px] rounded-md shadow-md bg-primary">
                <h3 className="text-2xl font-semibold mb-4 text-center text-white">Login</h3>
                
                <div className="relative mb-4">
                    <span className="absolute left-3 top-3 text-gray-500"><i className="fas fa-envelope"></i></span>
                    <input
                        className="pl-10 inputBox w-full p-2 border border-orange-300 rounded-md focus:ring-orange-200 focus:border-orange-200"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </div>
                
                <div className="relative mb-4">
                    <span className="absolute left-3 top-3 text-gray-500"><i className="fas fa-lock"></i></span>
                    <input
                        className="pl-10 inputBox w-full p-2 border border-orange-300 rounded-md focus:ring-orange-200 focus:border-orange-200"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
                
                {error && <div className="mb-4 text-red-500">{error}</div>}
                <button
                    className="w-full p-3 font-semibold text-base text-white bg-orange-400 rounded-md hover:bg-orange-500 focus:outline-none"
                    onClick={handleLogin}
                    type="button"
                >
                    Login
                </button>
                <p className="mt-4 text-white">
                    Forget Password?{" "}
                    <span
                        onClick={() => setIsModalOpen(true)}
                        className="text-blue-400 cursor-pointer"
                    >
                        Click here
                    </span>
                </p>
                <p className="text-white">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-orange-400">
                        Sign Up
                    </a>
                </p>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg mx-4 md:mx-0">
                        <h2
                            className="cursor-pointer font-bold text-lg text-right"
                            onClick={() => setIsModalOpen(false)}
                        >
                            X
                        </h2>
                        <h2 className="text-lg mb-4">Forgot Password</h2>
                        <div className="relative mb-4">
                            <span className="absolute left-3 top-3 text-gray-500"><i className="fas fa-envelope"></i></span>
                            <input
                                className="pl-10 w-full p-2 border border-orange-300 rounded focus:ring-orange-200 focus:border-orange-200"
                                type="email"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>
                        {resetError && <div className="mb-4 text-red-500">{resetError}</div>}
                        <button
                            className="w-full p-2 text-white bg-orange-300 rounded-md hover:bg-orange-500 focus:outline-none focus:ring focus:border-orange-300"
                            onClick={handleForgotPassword}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
