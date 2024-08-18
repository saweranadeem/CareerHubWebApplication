import React from 'react'
import { Button } from 'react-scroll'

const News = ({ query, HandleInputChange }) => {
    return (
        <div className='md:px-14 px-4 max-w-screen-2xl  mx-auto mt-12  '>
            <div className='border-secondary border-2 w-auto'>
                <div>
                    <h1 className='text-2xl font-semibold text-white bg-primary mb-3 px-4 py-4'>Latest News</h1>

                    <div className='px-4' >
                        <ul className='text-lg font-semibold '>
                            <li className=' bg-gray-200 px-4 py-3 hover:text-primary'><a href='https://www.pu.edu.pk/' target='_blank'>Punjab University</a></li>
                            <li className='px-4 py-3 hover:text-primary'><a href='https://www.pu.edu.pk/'>Punjab University</a></li>
                            <li className='bg-gray-200 px-4 py-3 hover:text-primary'><a href='https://www.pu.edu.pk/'>Punjab University</a></li>
                            <li className=' px-4 py-3 hover:text-primary-'><a href='https://www.pu.edu.pk/'>Punjab University</a></li>
                        </ul>
                        <Button onClick={() => HandleInputChange(query)} className='px-3 py-2 mb-3 border-primary border-2 hover:bg-primary hover:text-white'><a href='https://www.pu.edu.pk/'>View More</a></Button>
                    </div>
                   
                </div>
s
            </div>
        </div>
    )
}

export default News