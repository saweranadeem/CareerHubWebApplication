import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaUserCircle, FaUpload, FaTrash, FaEdit } from 'react-icons/fa';
import Nav from "../Components/Home/Nav";
import Footer from "../Components/Home/Footer";
import ChangePasswordForm from '../Components/Home/ChangePasswordForm';

const Profile = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [profilePicturePreview, setProfilePicturePreview] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const { userId } = useParams();
    const location = useLocation();

    if (!auth) {
        navigate('/');
        return null;
    }

    const logout = () => {
        localStorage.clear();
        navigate('/');
    };


    // useEffect(() => {
    //     // Load profile picture from local storage
    //     const storedUser = localStorage.getItem('user');
    //     const base64ProfilePicture = localStorage.getItem('profilePicture');
    
    //     if (storedUser) {
    //         const user = JSON.parse(storedUser);
    //         console.log("path", base64ProfilePicture);
    //         // Check if base64ProfilePicture is valid
    //         if (base64ProfilePicture) {
    //             setProfilePicturePreview(base64ProfilePicture);
    //         }
    //     }
    // }, []);

    useEffect(() => {
        // Load profile picture from local storage
        const storedUser = localStorage.getItem('user');
    
        if (storedUser) {
            const user = JSON.parse(storedUser);
            console.log("path", user.profilePicture);
            // Check if profilePicturePath is valid
            if (user.profilePicture) {
                setProfilePicturePreview(user.profilePicture);
            }
        }
    }, []);
    
    
    const parsedAuth = JSON.parse(auth);

    const [user, setUser] = useState({
        name: '',
        email: parsedAuth.email,
        profilePicture: null,
    });
    // useEffect(() => {
    //     // Load profile picture from local storage
    //     const storedUser = localStorage.getItem('user');

    //     if (storedUser) {
    //         const user = JSON.parse(storedUser);
    //         const profilePicturePath = user.profilePicture;
    //         console.log("path", profilePicturePath)
    //         // Check if profilePicturePath is valid
    //         if (profilePicturePath) {
    //             // Extract the file name from the path
    //             const fileName = profilePicturePath.split('\\').pop();
    //             // Construct the URL to access the image
    //             const imageURL = `http://localhost:5173/uploads/${fileName}`;
    //             setProfilePicturePreview(imageURL);
    //         }
    //     }
    // }, []);

    // const parsedAuth = JSON.parse(auth);

    // const [user, setUser] = useState({
    //     name: '',
    //     email: parsedAuth.email,
    //     profilePicture: null,
    // });

    // useEffect(() => {
    //     if (userId) {
    //         axios.get(`/api/user/${userId}`)
    //             .then(res => {
    //                 setUser(prevState => ({
    //                     ...prevState,
    //                     name: res.data.name || '',
    //                     profilePicture: res.data.profilePicture
    //                 }));
    //                 if (res.data.profilePicture) {
    //                     setProfilePicturePreview(`/uploads/${resData.user.profilePicture}`);
    //                 } else {
    //                     setProfilePicturePreview(null);
    //                 }
    //             })
    //             .catch(err => console.log(err));
    //     }
    // }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    // const handleProfilePictureUpload = (e) => {
    //     const file = e.target.files[0];
    //     console.log("file", file)
    //     setProfilePic(file);
    //     setProfilePicturePreview(URL.createObjectURL(file));
    // };

    const handleProfilePictureUpload = (e) => {
        const file = e.target.files[0];
        console.log("file", file)
        setProfilePic(file);
        setProfilePicturePreview(URL.createObjectURL(file));
    };
    

    // const handleRemoveProfilePicture = async () => {
    //     const auth = localStorage.getItem('user');
    //     const parsedAuth = JSON.parse(auth);
    //     const userId = parsedAuth._id;
    //    setError('');
    //     setSuccess('');
    //     try {
    //         const response = await fetch(`http://localhost:3000/profile/${userId}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             setError(`Error: ${response.status} ${response.statusText} - ${errorData.error || 'An unknown error occurred'}`);
    //             return;
    //         }
    //         // Update local storage to remove the profile picture
    //         const updatedAuth = { ...parsedAuth, profilePicture: null };
    //         localStorage.setItem('user', JSON.stringify(updatedAuth));
    //         setProfilePic(null);
    //         setProfilePicturePreview(null);
    //         setShowDropdown(false);
    //         setSuccess('Profile picture removed successfully');
    //     } catch (error) {
    //         console.error('Error removing profile picture:', error.message);
    //         setError('Internal server error');
    //     }
    // };

    const handleRemoveProfilePicture = async () => {
        const auth = localStorage.getItem('user');
        const parsedAuth = JSON.parse(auth);
        const userId = parsedAuth._id;
    
        setError('');
        setSuccess('');
    
        try {
            const response = await fetch(`http://localhost:3000/profile/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                setError(`Error: ${response.status} ${response.statusText} - ${errorData.error || 'An unknown error occurred'}`);
                return;
            }
    
            // Update local storage to remove the profile picture
            const updatedAuth = { ...parsedAuth, profilePicture: null };
            localStorage.setItem('user', JSON.stringify(updatedAuth));
    
            setProfilePic(null);
            setProfilePicturePreview(null);
            setShowDropdown(false);
            setSuccess('Profile picture removed successfully');
        } catch (error) {
            console.error('Error removing profile picture:', error.message);
            setError('Internal server error');
        }
    };
    
    // const handleUpdate = async () => {
    //     setError('');
    //     setSuccess('');
    
    //     const formData = new FormData();
    //     formData.append('name', user.name);
    //     if (profilePic) {
    //         formData.append('profilePicture', profilePic);
    //         console.log("profilePic added to formData:", profilePic);
    //     }
    
    //     try {
    //         const response = await fetch(`http://localhost:3000/profile/${userId}`, {
    //             method: 'PUT',
    //             body: formData,
    //         });
    
    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             setError(`Error: ${response.status} ${response.statusText} - ${errorData.error || 'An unknown error occurred'}`);
    //             return;
    //         }
    
    //         const resData = await response.json();
    //         console.log("response data:", resData);
    
    //         setUser(prevState => ({
    //             ...prevState,
    //             name: '', // Clear name input field after update
    //             profilePicture: resData.user.profilePicture
    //         }));
    
    //         // Convert profile picture to base64 and update local storage
    //         let base64ProfilePicture = '';
    //         if (profilePic) {
    //             base64ProfilePicture = await convertToBase64(profilePic);
    //             localStorage.setItem('profilePicture', base64ProfilePicture);
    //             console.log("Profile picture converted to base64 and stored in local storage:", base64ProfilePicture);
    //         }
    
    //         // Update local storage with the new profile picture and ensure name remains unchanged if not updated
    //         const updatedAuth = { ...parsedAuth, profilePicture: resData.user.profilePicture };
    //         if (user.name) {
    //             updatedAuth.name = user.name;
    //         } else {
    //             updatedAuth.name = parsedAuth.name; // Ensure name remains unchanged if not provided
    //         }
    //         localStorage.setItem('user', JSON.stringify(updatedAuth));
    
    //         if (profilePic) {
    //             setProfilePic(profilePic);
    //             setProfilePicturePreview(URL.createObjectURL(profilePic));
    //             console.log("Profile picture preview updated:", URL.createObjectURL(profilePic));
    //         }
    
    //         setSuccess('Profile updated successfully');
    //     } catch (error) {
    //         console.error('Update failed:', error.message);
    //         setError('Internal server error');
    //     }
    // };
    
    const handleUpdate = async () => {
        setError('');
        setSuccess('');
    
        const formData = new FormData();
        formData.append('name', user.name);
        if (profilePic) {
            formData.append('profilePicture', profilePic);
            console.log("profilePic added to formData:", profilePic);
        }
    
        try {
            const response = await fetch(`http://localhost:3000/profile/${userId}`, {
                method: 'PUT',
                body: formData,
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                setError(`Error: ${response.status} ${response.statusText} - ${errorData.error || 'An unknown error occurred'}`);
                return;
            }
    
            const resData = await response.json();
            console.log("response data:", resData);
    
            setUser(prevState => ({
                ...prevState,
                name: '', // Clear name input field after update
                profilePicture: resData.user.profilePicture
            }));
    
            // Convert profile picture to base64 and update local storage
            let base64ProfilePicture = '';
            if (profilePic) {
                base64ProfilePicture = await convertToBase64(profilePic);
                console.log("Profile picture converted to base64:", base64ProfilePicture);
            }
    
            // Update local storage with the new profile picture and ensure name remains unchanged if not updated
            const updatedAuth = { ...parsedAuth, profilePicture: base64ProfilePicture || resData.user.profilePicture };
            if (user.name) {
                updatedAuth.name = user.name;
            } else {
                updatedAuth.name = parsedAuth.name; // Ensure name remains unchanged if not provided
            }
            localStorage.setItem('user', JSON.stringify(updatedAuth));
    
            if (profilePic) {
                setProfilePic(profilePic);
                setProfilePicturePreview(URL.createObjectURL(profilePic));
                console.log("Profile picture preview updated:", URL.createObjectURL(profilePic));
            }
    
            setSuccess('Profile updated successfully');
        } catch (error) {
            console.error('Update failed:', error.message);
            setError('Internal server error');
        }
    };
    
    // Helper function to convert file to base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = () => {
                reject(new Error('File reading failed'));
            };
            reader.readAsDataURL(file);
        });
    };
    
    

    
    // Helper function to convert file to base64
    // const convertToBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             resolve(reader.result);
    //         };
    //         reader.onerror = () => {
    //             reject(new Error('File reading failed'));
    //         };
    //         reader.readAsDataURL(file);
    //     });
    // };


    const handleChangePassword = async (oldPassword, newPassword, confirmPassword, resetFields) => {
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            setSuccess('');
            return;
        }

        const auth = localStorage.getItem('user');
        const parsedAuth = JSON.parse(auth);
        const userId = parsedAuth._id;

        try {
            const response = await fetch(`http://localhost:3000/profile/change-password/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ oldPassword, newPassword }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 404) {
                    setError('User not found');
                } else if (response.status === 400 && errorData.error === 'Old password is incorrect') {
                    setError('Old password is incorrect');
                } else {
                    setError(errorData.error || 'Error resetting password');
                }
                setSuccess('');
                return;
            }

            const data = await response.json();
            setSuccess(data.message || 'Password changed successfully');
            setError('');
            resetFields(); // Clear input fields
        } catch (error) {
            console.error('Error:', error.message);
            setError('Internal server error');
            setSuccess('');
        }
    };

    const isChangePasswordRoute = location.pathname.includes('change-password');

    return (
        <div>
             <Nav />
            <div className="flex h-screen mb-10">
            {/* Sidebar */}
            <div className="w-full md:w-1/3 lg:w-1/4  bg-primary py-32 px-8 md:py-32 md:px-8">

<nav>
    <ul>
        <li className="mb-4 flex items-center">
            <button onClick={() => navigate(`/profile/${userId}`)} className="text-white hover:underline flex items-center">
                <FaUserCircle className="mr-1" />
                Profile
            </button>
        </li>
        <li className="mb-4 flex items-center">
            <button onClick={() => navigate(`/profile/change-password/${userId}`)} className="text-white hover:underline flex items-center">
                <FaEdit className="mr-1" />
                Change Password
            </button>
        </li>
        <li className="mb-4 flex items-center">
            <button onClick={logout} className="text-red-500 hover:underline flex items-center">
                <FaTrash className="mr-1" />
                Logout
            </button>
        </li>
    </ul>
</nav>

</div>

            {/* Main content */}
            <div className="w-full lg:w-2/3 py-12 md:py-28 md:px-14">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    {isChangePasswordRoute ? (
                        <ChangePasswordForm
                            handleChangePassword={handleChangePassword}
                            error={error}
                            success={success}
                            setError={setError}
                            setSuccess={setSuccess}
                        />
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold mb-4">Profile</h1>
                            <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-1/3 flex flex-col items-center relative">
                                    <div className="mb-4">
                                        <div
                                            onClick={() => setShowDropdown(!showDropdown)}
                                            className="cursor-pointer"
                                        >
                                            {profilePicturePreview ? (
                                                <img
                                                    src={profilePicturePreview}
                                                    alt="Profile Preview"
                                                    className="h-32 w-32 rounded-full object-cover"
                                                />
                                            ) : (
                                                <FaUserCircle className="text-9xl text-gray-700" />
                                            )}
                                        </div>
                                        {showDropdown && (
                                            <div className="absolute right-0 mt-2 py-2 bg-white shadow-md rounded-lg border border-gray-200 z-10">
                                                <input
                                                    type="file"
                                                    name="profilePicture"
                                                    onChange={handleProfilePictureUpload}
                                                    className="hidden"
                                                    id="profilePictureInput"
                                                />
                                                {!profilePicturePreview && (
                                                    <label
                                                        htmlFor="profilePictureInput"
                                                        className="flex px-6 py-2 text-sm text-gray-700 hover:text-primary cursor-pointer"
                                                    >
                                                        Upload
                                                        <FaUpload className="ml-2" />
                                                    </label>
                                                )}
                                                {profilePicturePreview && (
                                                    <>
                                                        <button
                                                            onClick={() => document.getElementById('profilePictureInput').click()}
                                                            className="flex px-6 py-2 text-sm hover:text-primary text-primary items-center"
                                                        >
                                                            Change
                                                            <FaEdit className="ml-2" />
                                                        </button>
                                                        <button
                                                            onClick={handleRemoveProfilePicture}
                                                            className="flex px-6 py-2 text-sm hover:text-primary items-center text-red-600"
                                                        >
                                                            Remove
                                                            <FaTrash className="ml-2" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="w-full md:w-2/3 md:pl-6">
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={user.name}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded"
                                        />
                                        
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={user.email}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded"
                                            disabled
                                        />
                                    </div>
                                    {error && <p className='text-red-600'>{error}</p>}
                                    {success && <p className='mt-4 text-green-600'>{success}</p>}
                                    <button
                                        onClick={handleUpdate}
                                        className="bg-primary text-white px-4 py-2 rounded mt-4"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
           
        </div>
        <Footer />
        </div>
    );
};

export default Profile;
