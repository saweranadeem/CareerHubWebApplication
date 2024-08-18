import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiDollarSign, FiMapPin, FiBriefcase } from "react-icons/fi"; // Import FiBriefcase for experience

const Card = ({ data }) => {
  const {
    _id,
    companyName,
    jobTitle,
    companyLogo,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    postingDate,
    employmentType,
    description,
    experienceLevel,
    skills,
  } = data;

  return (
    <section className='card relative bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 z-[1]'>
      <Link to={`/job/${_id}`} className='flex gap-4 flex-col sm:flex-row items-start p-4'>
        <img src={companyLogo} alt={`${companyName} logo`} className='w-16 h-16 object-cover rounded-md' />
        <div className='flex-1'>
          <h4 className='text-indigo-600 mb-1'>{companyName}</h4>
          <h3 className='text-lg font-semibold text-gray-800 mb-2'>{jobTitle}</h3>

          <div className='text-gray-600 text-sm flex flex-wrap gap-4 mb-2'>
          <p className='text-sm text-gray-700'>{description}</p>
            <span className='flex items-center gap-2'><FiMapPin className='text-indigo-500' />{jobLocation}</span>
            <span className='flex items-center gap-2'><FiClock className='text-indigo-500' />{employmentType}</span>
            <span className='flex items-center gap-2'><FiDollarSign className='text-indigo-500' />{minPrice} - {maxPrice} {salaryType}</span>
            <span className='flex items-center gap-2'><FiCalendar className='text-indigo-500' />{postingDate}</span>
            <span className='flex items-center gap-2'><FiBriefcase className='text-indigo-500' />{experienceLevel}</span>
          </div>
          <div className='text-gray-600 text-sm flex flex-wrap gap-4 mb-2'>
            {skills && skills.map((skill, index) => (
              <span key={index} className='bg-indigo-100 text-indigo-600 px-2 py-1 rounded-md'>{skill.label}</span>
            ))}
          </div>
        </div>
      </Link>
    </section>
  );
}

export default Card;
