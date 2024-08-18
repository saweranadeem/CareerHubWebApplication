import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from "../Components/Home/Nav"
import Footer from "../Components/Home/Footer"
// import NewsLetter from '../components/NewsLetter'
// import SideNav from '../components/SideNav'
// import myJobs from '../components/myJobs'

const MyJobs = () => {
    const [jobs, setJobs] = useState([])
    const [searchText, setSearchText] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    // set current page
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6

    useEffect(() => {
        const user = localStorage.getItem('user'); // Retrieve user object from local storage
        
        if (user) {
            const parsedUser = JSON.parse(user); // Parse the JSON string
            const email = parsedUser.email; // Extract email from parsed object
            
            if (email) {               
                setIsLoading(true); // Set loading state to true
                fetch(`http://localhost:3000/myJobs/${email}`) // Fetch jobs from server
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return res.json(); // Parse JSON response
                    })
                    .then((data) => {
                        setJobs(data); // Update state with fetched jobs
                        setIsLoading(false); // Set loading state to false
                    })
                    .catch((error) => {
                        setIsLoading(false); // Set loading state to false on error
                    });
            } else {
                setIsLoading(false); // Ensure loading state is false if no email
            }
        } else {
            setIsLoading(false); // Ensure loading state is false if no user
        }
    }, [searchText]); // Dependency array: re-run the effect when searchText changes
    


    // pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem)

    // next & previous button
    const nextPage = () => {
        if(indexOfLastItem < jobs.length){
            setCurrentPage(currentPage + 1)
        }
    }

    const prevPage = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage - 1)
        }
    }
    const handleSearch = () => {
        const filter = jobs.filter((job) => job.jobTitle && job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
        //  console.log(filter)
        setJobs(filter)
        setIsLoading(false)
    }

    // handle delete for delete button
    const handleDelete = (id) => {
        console.log(id)
        fetch(`http://localhost:3000/job/${id}`, {
            method: "DELETE"
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged === true) {
                    alert("Deleted successfully");
                    setJobs(jobs.filter(job => job._id !== id)); // Update the state to remove the deleted job
                }
            })
    };

    // console.log(searchText)

    return <div className='md:px-14 p-3 max-w-screen-2xl mx-auto'>
        <Nav />
    <div className=''>
        <h1 className='text-center px-4 mt-28 font-bold text-lg'>All My Jobs</h1>
        <div className='p-2 text-center mb-2'>
            <input onChange={(e) => setSearchText(e.target.value)} type='text' name='search' id='search' className='py-2 pl-3 border 
            focus:outline-none lg:w-6/12 mb-4 w-full' />
            <button className='bg-primary text-white font-semibold px-8 py-2 rounded-sm mb-4' onClick={handleSearch}>Search </button>
        </div>

    </div>

    {/* table */}
    <section className="py-1 bg-blueGray-50 grid grid-rows-1 gap-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-blueGray-700">All Jobs</h3>
                        </div>
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <Link to="/jobs/post-job" ><button className="bg-primary text-white active:bg-primary text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 
                                ease-linear transition-all duration-150" type="button">Post a New Job</button> </Link>
                        </div>
                    </div>
                </div>

                <div className="block w-full overflow-x-auto">
                    <table className="items-center bg-transparent w-full border-collapse ">
                        <thead>
                            <tr>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    NO.
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    TITLE
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    COMPANY NAME
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    SALARY
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    EDIT
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    DELETE
                                </th>
                            </tr>
                        </thead>

                        {
                            isLoading ? (
                            <div className='flex justify-center items-center h-20'>
                                <p>Loading...</p>
                            </div>
                            ) : (
                            <tbody>
                                {
                                   currentJobs.map((job, index) => (
                                        <tr key={index}>
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                {index + 1}
                                            </th>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                {job.jobTitle}
                                            </td>
                                            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {job.companyName}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                ${job.minPrice} - ${job.maxPrice}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <Link to={`/edit-job/${job?._id}`}><button >Edit</button></Link>
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <button onClick={() => handleDelete(job._id)} className='bg-red-700 py-2 px-6 text-white rounded-md'>
                                                    Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }


                            </tbody>)
                        }


                    </table>
                </div>
            </div>
        </div>
        
        {/* pagination */}
        <div className="flex justify-center text-black space-x-8 mt-8">
            {
                currentPage > 1 && (
                    <button className='hover: underline' onClick={prevPage}>Previous</button>         
                )
            }
            {
                indexOfLastItem < jobs.length && (
                    <button className='hover: underline' onClick={nextPage}>Next</button>
                )
            }
            </div>
            {/* <Footer /> */}
    </section>
        {/* <section className='right '>
        <div className=' grid-rows-2 bg-white p-3 rounded align-self:flex-end'><SideNav /></div>
        </section> */}

    </div>

}

export default MyJobs