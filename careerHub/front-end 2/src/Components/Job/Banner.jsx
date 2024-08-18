import React from 'react';
import { FiMapPin, FiSearch } from "react-icons/fi";

const Banner = ({ query, location, HandleInputChange, handleLocationChange, handleSubmit }) => {
    return (
        <div className='md:px-14 mt-6 max-w-screen-2xl container mx-auto xl:px-24 px-4 md:pt-24 py-14 text-white relative z-[1]'>
            <div className='gradientBg rounded-xl rounded-br-[80px] md:p-[110px] px-8 py-9'>
                <h1 className='font-bold text-5xl mb-3'>Your career <span className='text-orange-400'>journey</span> starts here</h1>
                <p className='text-lg mb-8'>Begin exploring job opportunities that align with your ambitions.</p>
                <form onSubmit={handleSubmit}>
                    <div className='flex justify-start md:flex-row flex-col md:gap-0 gap-4'>
                        <div className='relative flex md:rounded-s-md rounded shadow-md ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-300 md:w-1/2 w-full bg-white text-black'>
                            <input 
                                type='text' 
                                name='title' 
                                id='title' 
                                placeholder="What position are you looking for?" 
                                className='block flex-1 border-0 bg-transparent py-3 pl-12 pr-4 placeholder-gray-500 focus:ring-0 sm:text-sm sm:leading-6' 
                                onChange={HandleInputChange}
                                value={query}
                            />
                            <FiSearch className='absolute top-3 left-3 text-gray-500'></FiSearch>
                        </div>
                        <div className='relative flex md:rounded-s-none rounded shadow-md ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-300 md:w-1/3 w-full bg-white text-black'>
                            <input 
                                type='text' 
                                name='location' 
                                id='location' 
                                placeholder="Location" 
                                className='block flex-1 border-0 bg-transparent py-3 pl-12 pr-4 placeholder-gray-500 focus:ring-0 sm:text-sm sm:leading-6'
                                onChange={handleLocationChange}
                                value={location}
                            />
                            <FiMapPin className='absolute top-3 left-3 text-gray-500'></FiMapPin>
                        </div>
                        <button 
                            type='submit' 
                            className='btns bg-orange-400 py-3 px-6 text-black font-semibold md:rounded-s-none rounded transition duration-300 hover:bg-orange-500'
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Banner;
