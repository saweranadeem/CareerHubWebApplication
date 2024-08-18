import React from 'react'
import baner from '../../assets/baner.png'

const NewsLetter = () => {
    return (
        <div className='md:px-12 px-4 p-4 max-w-screen-2xl mx-auto my-12 '>
            <div className='gradientBg rounded-xl rounded-br-[80px] md:p-9 px-4 py-9'>
                <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-10 '>
                    {/*  NewsLetter image */}
                    <div>
                        <img src={baner} alt="" className='h-[250px] lg:h-[350px] pt-[5px]' />
                    </div>

                    {/* content */}
                    <div className='md:w-3/5'>
                        <h2 className='md:text-5xl text-3xl font-bold text-white mb-5'>Every student can share their discount code for friends.</h2>
                        <p className='text-tertiary'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        {/* button */}
                        <div className='space-x-5 mt-8'>
                            <button className='btnPrimary'>I have a code</button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default NewsLetter