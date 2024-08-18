import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import Nav from "../Components/Home/Nav"
import '../App.css';

const UpdateJob = () => {
    const { id } = useParams();
    const [jobData, setJobData] = useState({});
    const [selectedOption, setSelectedOption] = useState([]);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:3000/all-jobs/${id}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Fetched job data:', data);
                    setJobData(data);
                    setSelectedOption(data.skills.map(skill => ({ value: skill, label: skill })));
                    reset({
                        jobTitle: data.jobTitle || '',
                        companyName: data.companyName || '',
                        minPrice: data.minPrice || '',
                        maxPrice: data.maxPrice || '',
                        salaryType: data.salaryType || '',
                        jobLocation: data.jobLocation || '',
                        postingDate: data.postingDate || '',
                        experienceLevel: data.experienceLevel || '',
                        companyLogo: data.companyLogo || '',
                        employmentType: data.employmentType || '',
                        description: data.description || '',
                        postedBy: data.postedBy || ''
                    });
                })
                .catch(error => console.error('Error fetching job data:', error));
        }
    }, [id, reset]);

    const onSubmit = (data) => {
        data.skills = selectedOption.map(option => option.value);

        fetch(`http://localhost:3000/update-job/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(result => {
            console.log('Update result:', result);
            if (result.acknowledged) {
                alert('Job Updated successfully');
                reset();
            }
        })
        .catch(error => console.error('Error updating job:', error));
    };

    const options = [
        { value: 'Javascript', label: 'Javascript' },
        { value: 'C++', label: 'C++' },
        { value: 'HTML', label: 'HTML' },
        { value: 'CSS', label: 'CSS' },
        { value: 'React', label: 'React' },
        { value: 'Node', label: 'Node' },
        { value: 'MongoDB', label: 'MongoDB' },
        { value: 'Redux', label: 'Redux' },
    ];

    return (
        <div className='md:px-14 p-3 max-w-screen-2xl mx-auto mt-[70px]'>
            <Nav />
            <div className='bg-[#FAFAFA] py-10 px-4 lg:px-16'>
                <form onSubmit={handleSubmit(onSubmit)} className='py-5'>
                    {/* 1st row */}
                    <div className='flex flex-col lg:flex-row items-center justify-between gap-8 mt-8'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Job Title<span className='text-red-600'>*</span></label>
                            <input type='text'
                                {...register("jobTitle", { required: true })} className='block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6' />
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Company Name<span className='text-red-600'>*</span></label>
                            <input type='text' placeholder='Ex: Microsoft'
                                {...register("companyName", { required: true })} className='block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6' />
                        </div>
                    </div>

                    {/* 2nd row */}
                    <div className='flex flex-col lg:flex-row items-center justify-between gap-8 mt-8'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Minimum Salary<span className='text-red-600'>*</span></label>
                            <input type='text' placeholder='$20k'
                                {...register("minPrice", { required: true })} className='block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6' />
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Maximum Salary<span className='text-red-600'>*</span></label>
                            <input type='text' placeholder='100k'
                                {...register("maxPrice", { required: true })} className='block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6' />
                        </div>
                    </div>

                    {/* 3rd row */}
                    <div className='flex flex-col lg:flex-row items-center justify-between gap-8 mt-8'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Salary Type<span className='text-red-600'>*</span></label>
                            <select {...register("salaryType", { required: true })} className='block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6'>
                                <option value="">Choose your salary</option>
                                <option value="Hourly">Hourly</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Job Location<span className='text-red-600'>*</span></label>
                            <input type='text' placeholder='Ex: New York'
                                {...register("jobLocation", { required: true })} className='block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6' />
                        </div>
                    </div>

                    {/* 4th row */}
                    <div className='flex flex-col lg:flex-row items-center justify-between gap-8 mt-8'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Job Posting Date<span className='text-red-600'>*</span></label>
                            <input type='date'
                                {...register("postingDate", { required: true })} className='block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6' />
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Experience Level<span className='text-red-600'>*</span></label>
                            <select {...register("experienceLevel", { required: true })} className='block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6'>
                                <option value="">Choose your experience</option>
                                <option value="NoExperience">No Experience</option>
                                <option value="Internship">Internship</option>
                                <option value="Work remotely">Work remotely</option>
                            </select>
                        </div>
                    </div>

                    {/* 5th row */}
                    <div>
                        <label className='block mb-2 text-lg'>Required Skill Sets:<span className='text-red-600'>*</span></label>
                        <CreatableSelect
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                            isMulti
                            className='block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6' py-4 />
                    </div>

                    {/* 6th row */}
                    <div className='flex flex-col lg:flex-row items-center justify-between gap-8 mt-8'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Company Logo<span className='text-red-600'>*</span></label>
                            <input type='url' placeholder='Paste your company logo url: https://weshare.com/img1'
                                {...register("companyLogo", { required: true })} className='block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6' />
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Employment Type<span className='text-red-600'>*</span></label>
                            <select {...register("employmentType", { required: true })} className='block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6'>
                                <option value="">Select your job type</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Temporary">Temporary</option>
                            </select>
                        </div>
                    </div>

                    {/* 7th row */}
                    <div className='w-full mt-8'>
                        <label className='block mb-2 text-lg'>Job Description<span className='text-red-600'>*</span></label>
                        <textarea className='w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-400' rows={6}
                            placeholder='Job Description'
                            {...register("description", { required: true })} />
                    </div>

                    {/* last row */}
                    <div className='w-full mt-8'>
                        <label className='block mb-2 text-lg'>Job Posted By<span className='text-red-600'>*</span></label>
                        <input
                            type='email'
                            placeholder='Your mail'
                            {...register("postedBy", { required: true })}
                            className='block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6'
                        />
                    </div>

                    {/* submit button */}
                    <input type="submit" className='block mt-12 bg-primary py-2 px-8 font-semibold text-white rounded-md cursor-pointer btns' />
                </form>
            </div>
        </div>
    );
};

export default UpdateJob;
