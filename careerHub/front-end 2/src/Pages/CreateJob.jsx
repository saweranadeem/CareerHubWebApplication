import { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import CreatableSelect from 'react-select/creatable';
import Nav from "../Components/Home/Nav";

const CreateJob = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        data.skills = selectedOption;
        // console.log(data);

        // backend code
        fetch("http://localhost:3000/jobs/post-job", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.acknowledged === true) {
                    alert("Job posted successfully");
                }
                reset();
            });
    };

    const options = [
        { value: "Javascript", label: "Javascript" },
        { value: "C++", label: "C++" },
        { value: "HTML", label: "HTML" },
        { value: "CSS", label: "CSS" },
        { value: "React", label: "React" },
        { value: "Node", label: "Node" },
        { value: "MongoDB", label: "MongoDB" },
        { value: "Redux", label: "Redux" },
    ];

    return (
        <div className='md:px-14 p-3 max-w-screen-2xl mx-auto'>
            <Nav />
            {/* form */}
            <div className='bg-[#FAFAFA] py-10 px-4 lg:px-16'>
                <form onSubmit={handleSubmit(onSubmit)} className='py-5'>

                    {/* 1st row */}
                    <div className='flex flex-col lg:flex-row items-center justify-between gap-8 mt-8'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Job Title <span className="text-red-500">*</span></label>
                            <input type='text' defaultValue={"Web Developer"}
                                {...register("jobTitle", { required: "Job Title is required" })} className='block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6' />
                            {errors.jobTitle && <p className="text-red-600">{errors.jobTitle.message}</p>}
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Company Name <span className="text-red-500">*</span></label>
                            <input type='text' placeholder='Ex: Microsoft'
                                {...register("companyName", { required: "Company Name is required" })} className='block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6' />
                            {errors.companyName && <p className="text-red-600">{errors.companyName.message}</p>}
                        </div>
                    </div>

                    {/* 2nd row */}
                    <div className='flex flex-col lg:flex-row items-center justify-between gap-8 mt-8'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Minimum Salary <span className="text-red-500">*</span></label>
                            <input type='text' placeholder='40k'
                                {...register("minPrice", { required: "Minimum Salary is required" })} className='block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6' />
                            {errors.minPrice && <p className="text-red-600">{errors.minPrice.message}</p>}
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Maximum Salary <span className="text-red-500">*</span></label>
                            <input type='text' placeholder='100k'
                                {...register("maxPrice", { required: "Maximum Salary is required" })} className='block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6' />
                            {errors.maxPrice && <p className="text-red-600">{errors.maxPrice.message}</p>}
                        </div>
                    </div>

                    {/* 3rd row */}
                    <div className='flex flex-col lg:flex-row items-center justify-between gap-8 mt-8'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Salary Type <span className="text-red-500">*</span></label>
                            <select {...register("salaryType", { required: "Salary Type is required" })} className='block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6'>
                                <option value="">Choose your salary</option>
                                <option value="Hourly">Hourly</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                            {errors.salaryType && <p className="text-red-600">{errors.salaryType.message}</p>}
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Job Location <span className="text-red-500">*</span></label>
                            <input type='text' placeholder='Ex: Lahore'
                                {...register("jobLocation", { required: "Job Location is required" })} className='block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6' />
                            {errors.jobLocation && <p className="text-red-600">{errors.jobLocation.message}</p>}
                        </div>
                    </div>

                    {/* 4th row */}
                    <div className='flex flex-col lg:flex-row items-center justify-between gap-8 mt-8'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Job Posting Date <span className="text-red-500">*</span></label>
                            <input type='date'
                                {...register("postingDate", { required: "Job Posting Date is required" })} className='block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6' />
                            {errors.postingDate && <p className="text-red-600">{errors.postingDate.message}</p>}
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Experience Level <span className="text-red-500">*</span></label>
                            <select {...register("experienceLevel", { required: "Experience Level is required" })} className='block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6'>
                                <option value="">Choose your experience</option>
                                <option value="NoExperience">No Experience</option>
                                <option value="Internship">Internship</option>
                                <option value="Work remotely">Work remotely</option>
                            </select>
                            {errors.experienceLevel && <p className="text-red-600">{errors.experienceLevel.message}</p>}
                        </div>
                    </div>

                    {/* 5th row */}
                    <div>
                        <label className='block mb-2 text-lg'>Required Skill Sets: <span className="text-red-500">*</span></label>
                        <Controller
                            control={control}
                            name="skills"
                            rules={{ required: "Skills are required" }}
                            render={({ field }) => (
                                <CreatableSelect
                                    {...field}
                                    defaultValue={selectedOption}
                                    onChange={(value) => {
                                        setSelectedOption(value);
                                        field.onChange(value);
                                    }}
                                    options={options}
                                    isMulti
                                    className='block w-full flex-1 bg-white pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 py-4' />
                            )}
                        />
                        {errors.skills && <p className="text-red-600">{errors.skills.message}</p>}
                    </div>

                    {/* 6th row */}
                    <div className='flex flex-col lg:flex-row items-center justify-between gap-8 mt-8'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Company Logo <span className="text-red-500">*</span></label>
                            <input type='url' placeholder='Paste your company logo url: https://weshare.com/img1'
                                {...register("companyLogo", { required: "Company Logo is required" })} className='create-job-input' />
                            {errors.companyLogo && <p className="text-red-600">{errors.companyLogo.message}</p>}
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Employment Type <span className="text-red-500">*</span></label>
                            <select {...register("employmentType", { required: "Employment Type is required" })} className='block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6'>
                                <option value="">Select your job type</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Temporary">Temporary</option>
                            </select>
                            {errors.employmentType && <p className="text-red-600">{errors.employmentType.message}</p>}
                        </div>
                    </div>

                    {/* 7th row */}
                    <div className='w-full mt-8'>
                        <label className='block mb-2 text-lg'>Job Description <span className="text-red-500">*</span></label>
                        <textarea className='w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-400' rows={6}
                            defaultValue={"We are hiring for web developer position."} placeholder='Job Description'
                            {...register("description", { required: "Job Description is required" })} />
                        {errors.description && <p className="text-red-600">{errors.description.message}</p>}
                    </div>

                    {/* last row */}
                    <div className='w-full mt-8'>
                        <label className='block mb-2 text-lg'>Job Posted By <span className="text-red-500">*</span></label>
                        <input
                            type='email'
                            placeholder='Your email'
                            {...register("postedBy", { required: "Email is required" })}
                            className='block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6'
                        />
                        {errors.postedBy && <p className="text-red-600">{errors.postedBy.message}</p>}
                    </div>

                    {/* submit button */}
                    <input type="submit" className='block mt-12 bg-primary py-2 px-8 
                     font-semibold text-white rounded-md cursor-pointer btns' />
                </form>
            </div>
        </div>
    );
};

export default CreateJob;
