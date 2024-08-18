import React from 'react'
import { MDBBtn } from 'mdb-react-ui-kit';
import { FaEnvelopeOpenText, FaRocket } from 'react-icons/fa6'
import { Link, NavLink } from 'react-router-dom';
import SideNav from './SideNav';

const NewsLetter = () => {
    return (
        <>
        <div>
            <SideNav />
        </div>

{/* 2nd part */}
        <div className='mt-20'>
            <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
                    <FaRocket /> Get noticed faster
            </h3>
            <p className='text-primary/75 text-base mb-4'>Get new jobs emailed to you</p>
            <div className='w-full space-y-4'>
                <input type='submit' value={'Upload your resume'} className='w-full block py-2 pl-3 border foucs:outline-none bg-secondary 
                        rounder-sm text-white cursor-pointer font-semibold'/>
            </div>
        </div>
        </>
    )
}

export default NewsLetter