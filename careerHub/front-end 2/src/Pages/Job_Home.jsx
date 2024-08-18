import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../Components/Home/Nav';
import Banner from '../Components/Job/Banner';
import Card from '../Components/Job/Card';
import Jobs from './Jobs';
import Sidebar from '../sidebar/Sidebar';
import SideNav from '../Components/Job/SideNav';
import Footer from '../Components/Home/Footer';

const Job_Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/all-jobs")
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
        setIsLoading(false);
      });
  }, []);

  // handle input change for title
  const [query, setQuery] = useState('');
  const HandleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // handle input change for location
  const [location, setLocation] = useState('');
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  // handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery(query);
    setLocation(location);
    
  };

  // filter jobs by title and location
  const filteredItems = jobs.filter((job) =>
    job.jobTitle && job.jobTitle.toLowerCase().includes(query.toLowerCase()) &&
    job.jobLocation && job.jobLocation.toLowerCase().includes(location.toLowerCase())
  );

  // Radio filtering
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // button based filtering 
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  // calculate the index page
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  // function for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // function for the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // main function
  const filteredData = (jobs, selected, query, location) => {
    let filteredJobs = jobs;

    // filtering input items
    if (query || location) {
      filteredJobs = filteredItems;
    }

    // category filtering
    if (selected) {
      filteredJobs = filteredJobs.filter(({ jobLocation, maxPrice, experienceLevel, salaryType,
        employmentType, postingDate }) => (
        jobLocation.toLowerCase() === selected.toLowerCase() ||
        parseInt(maxPrice) === parseInt(selected) ||
        postingDate >= selected ||
        experienceLevel === selected ||
        salaryType.toLowerCase() === selected.toLowerCase() ||
        employmentType.toLowerCase() === selected.toLowerCase()
      ));
    }

    // slice the data based on the current page
    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);
    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  const result = filteredData(jobs, selectedCategory, query, location);

  return (
    <div>
      {/* Include Nav component */}
      <Nav />
      <Banner 
        query={query} 
        location={location} 
        HandleInputChange={HandleInputChange} 
        handleLocationChange={handleLocationChange} 
        handleSubmit={handleSubmit} 
      />
      <Outlet />

      {/* main content */}
      <div className='bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-3'>
        {/* left side */}
        <div className='bg-white p-4 rounded'>
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        {/* Jobs cards (mid side) */}
        <div className='col-span-2 bg-white p-4 rounded-sm'>
          {
            isLoading ? (
              <p className='font-medium'>Loading...</p>
            ) : result.length > 0 ? (
              <Jobs result={result} />
            ) : (
              <>
                <h3 className='text-lg font-bold mb-2'>{result.length} Jobs</h3>
                <p>No data found</p>
              </>
            )
          }

          {/* pagination here */}
          {
            result.length > 0 && (
              <div className='flex justify-center mt-4 space-x-8'>
                <button onClick={prevPage} disabled={currentPage === 1} className='hover:underline'>Previous</button>
                <span className='mx-2'>Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
                <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)} className='hover:underline'>Next</button>
              </div>
            )
          }
        </div>

        {/* right side */}
        <div className='bg-white p-3 rounded'>
          {/* <NewsLetter /> */}
          <SideNav />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Job_Home;
