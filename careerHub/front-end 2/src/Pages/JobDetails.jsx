import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Nav from "../Components/Home/Nav";

// CustomModal component
const CustomModal = ({ show, title, message, onClose }) => {
    if (!show) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='bg-black bg-opacity-50 absolute inset-0'></div>
            <div className='bg-white rounded-lg shadow-lg z-50 max-w-lg mx-auto p-8'>
                <h2 className='text-2xl font-semibold mb-4 text-gray-800'>{title}</h2>
                <p className='mb-6 text-gray-700'>{message}</p>
                <button onClick={onClose} className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300'>
                    Close
                </button>
            </div>
        </div>
    );
};

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        education: {
            degreeName: '',
            fieldOfStudy: ''
        },
        experience: {
            years: '',
            company: '',
            jobTitle: ''
        },
        availableNow: false,
        cvFile: null
    });
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/all-jobs/${id}`)
            .then(res => res.json())
            .then(data => setJob(data));
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEducationChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            education: {
                ...prevState.education,
                [name]: value
            }
        }));
    };

    const handleExperienceChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            experience: {
                ...prevState.experience,
                [name]: value
            }
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            cvFile: file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('jobId', id);
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('education', JSON.stringify(formData.education));
        formDataToSend.append('experience', JSON.stringify(formData.experience));
        formDataToSend.append('availableNow', formData.availableNow);
        if (formData.cvFile) {
            formDataToSend.append('cvFile', formData.cvFile);
        }

        try {
            const response = await fetch('http://localhost:3000/apply', {
                method: 'POST',
                body: formDataToSend
            });
            const result = await response.json();
            if (response.ok) {
                setModalVisible(true);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    education: {
                        degreeName: '',
                        fieldOfStudy: ''
                    },
                    experience: {
                        years: '',
                        company: '',
                        jobTitle: ''
                    },
                    availableNow: false,
                    cvFile: null
                });
            } else {
                console.error('Error:', result);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='max-w-screen-md mx-auto px-4 py-8 mt-8'>
            <Nav />
            <div className='bg-white shadow-lg rounded-lg p-8'>
                {/* Company Logo and Name */}
                <div className='flex items-center space-x-4 mb-6'>
                    {job.companyLogo && (
                        <img src={job.companyLogo} alt={`${job.companyName} logo`} className='w-24 h-24 object-cover rounded-md' />
                    )}
                    <div>
                        <h2 className='text-2xl font-bold text-gray-800'>{job.companyName}</h2>
                        <p className='text-lg text-gray-600'>{job.jobTitle}</p>
                    </div>
                </div>

                {/* Job Details */}
                <div className='space-y-4 mb-6'>
                    <p><strong className='text-gray-800'>Location:</strong> {job.jobLocation}</p>
                    <p><strong className='text-gray-800'>Salary Type:</strong> {job.salaryType}</p>
                    <p><strong className='text-gray-800'>Employment Type:</strong> {job.employmentType}</p>
                    <p><strong className='text-gray-800'>Job Description:</strong> {job.description}</p>
                    <p><strong className='text-gray-800'>Experience Level:</strong> {job.experienceLevel}</p>
                    {job.skills && (
                        <div>
                            <strong className='text-gray-800'>Skills Required:</strong>
                            <p className='text-gray-700'>{job.skills.map(skill => skill.label).join(', ')}</p>
                        </div>
                    )}
                     <p><strong className='italic text-gray-600'>Posted Date: {job.postingDate}</strong></p>
                </div>

                {/* Apply Now Form */}
                <div>
                    <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {/* Name */}
                        <div className='flex flex-col space-y-2'>
                            <label htmlFor='name' className='text-lg font-semibold text-gray-800'>Name<span className='text-red-600'>*</span></label>
                            <input type='text' id='name' name='name' value={formData.name} onChange={handleInputChange} className='px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' required />
                        </div>

                        {/* Email */}
                        <div className='flex flex-col space-y-2'>
                            <label htmlFor='email' className='text-lg font-semibold text-gray-800'>Email<span className='text-red-600'>*</span></label>
                            <input type='email' id='email' name='email' value={formData.email} onChange={handleInputChange} className='px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' required />
                        </div>

                        {/* Phone */}
                        <div className='flex flex-col space-y-2'>
                            <label htmlFor='phone' className='text-lg font-semibold text-gray-800'>Phone Number<span className='text-red-600'>*</span></label>
                            <input type='tel' id='phone' name='phone' value={formData.phone} onChange={handleInputChange} className='px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' required />
                        </div>

                        {/* Address */}
                        <div className='flex flex-col space-y-2 col-span-2'>
                            <label htmlFor='address' className='text-lg font-semibold text-gray-800'>Address<span className='text-red-600'>*</span></label>
                            <textarea id='address' name='address' value={formData.address} onChange={handleInputChange} rows='4' className='px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' required></textarea>
                        </div>

                        {/* Education */}
                        <div className='flex flex-col space-y-2'>
                            <label className='text-lg font-semibold text-gray-800'>Degree Name<span className='text-red-600'>*</span></label>
                            <input type='text' name='degreeName' value={formData.education.degreeName} onChange={handleEducationChange}
                                className='px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' required />
                        </div>

                        {/* Field of Study */}
                        <div className='flex flex-col space-y-2'>
                            <label className='text-lg font-semibold text-gray-800'>Field of Study<span className='text-red-600'>*</span></label>
                            <input type='text' name='fieldOfStudy' value={formData.education.fieldOfStudy} onChange={handleEducationChange} className='px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' required />
                        </div>

                        {/* Experience - Years */}
                        <div className='flex flex-col space-y-2'>
                            <label className='text-lg font-semibold text-gray-800'>Years of Experience<span className='text-red-600'>*</span></label>
                            <input type='number' name='years' value={formData.experience.years} onChange={handleExperienceChange} className='px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' required />
                        </div>

                        {/* Experience - Company */}
                        <div className='flex flex-col space-y-2'>
                            <label className='text-lg font-semibold text-gray-800'>Company Name<span className='text-red-600'>*</span></label>
                            <input type='text' name='company' value={formData.experience.company} onChange={handleExperienceChange} className='px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' required />
                        </div>

                        {/* Experience - Job Title */}
                        <div className='flex flex-col space-y-2'>
                            <label className='text-lg font-semibold text-gray-800'>Job Title<span className='text-red-600'>*</span></label>
                            <input type='text' name='jobTitle' value={formData.experience.jobTitle} onChange={handleExperienceChange} className='px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' required />
                        </div>

                        {/* Availability */}
                        <div className='flex items-center space-x-2 col-span-2'>
                            <input type='checkbox' id='availableNow' name='availableNow' checked={formData.availableNow} onChange={handleCheckboxChange} className='h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500' />
                            <label htmlFor='availableNow' className='text-lg font-semibold text-gray-800'>I am available to start immediately</label>
                        </div>

                        {/* CV Upload */}
                        <div className='flex flex-col space-y-2 col-span-2'>
                            <label htmlFor='cvFile' className='text-lg font-semibold text-gray-800'>Upload CV<span className='text-red-600'>*</span></label>
                            <input type='file' id='cvFile' name='cvFile' onChange={handleFileChange} className='px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' required />
                        </div>

                        {/* Submit Button */}
                        <div className='col-span-2 flex justify-end'>
                            <button type='submit' className='bg-primary text-white px-6 py-2 rounded-lg hover:bg-orange-400 transition duration-300'>
                                Apply Now
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Custom Modal */}
            <CustomModal show={modalVisible} title="Application Submitted" message="Your application has been successfully submitted!" onClose={() => setModalVisible(false)} />
        </div>
    );
};

export default JobDetails;

