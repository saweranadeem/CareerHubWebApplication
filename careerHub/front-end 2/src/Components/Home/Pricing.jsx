import React from 'react'
import { useState } from 'react'
// motion
import {motion} from 'framer-motion'
// variant
import {fadeIn} from '../../variants'

const Pricing = () => {

    const [isYearly, setIsYearly] = useState(false)

    const packages = [
        {
            name: "Start", monthlyPrice: "19", yearlyPrice: "199", decription: "A common form of Lorem ipsum reads: Lorem ipsum dolor sit amet, consecutur adipiscing elit.", green: "./src/assets/icon.png",
        },
        {
            name: "Advance", monthlyPrice: "39", yearlyPrice: "399", decription: "A common form of Lorem ipsum reads: Lorem ipsum dolor sit amet, consecutur adipiscing elit.", green: "./src/assets/icon.png",
        },
        {
            name: "Premium", monthlyPrice: "19", yearlyPrice: "599", decription: "A common form of Lorem ipsum reads: Lorem ipsum dolor sit amet, consecutur adipiscing elit.", green: "./src/assets/icon.png",
        }

    ]
    return (
        <div className='md:px-14 p-4 px-4 max-w-s mx-auto py-10' id='pricing'>
            <div className='text-center'>
                <h2 className='md:text-5xl text-3xl font-extrabold text-primary mb-2'>Here are all our plans</h2>
                <p className='text-tertiary md:w-1/3 mx-auto px-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Porro quibusdam corrupti tempore officia consequuntur odio!</p>

                {/* toogle pricing */}
                <div className='mt-10'>
                    <label htmlFor='toggle' className='inline-flex items-center cursor-pointer'>
                        <span className='mr-8 text-2xl font-semibold'>Monthly</span>
                        <div className='w-14 h-6 bg-gray-300 rounded-full transition duration-200 ease-in-out'>
                            <div className={`w-6 h-6 rounded-full transition duration-200 ease-in-out ${isYearly ? "bg-primary ml-8" : "bg-gray-500"} `} ></div>
                        </div>
                        <span className='ml-8 text-2xl font-semibold'>Yearly</span>
                    </label>
                    <input type="checkbox" id='toggle' className='hidden' checked={isYearly} onChange={() => setIsYearly(!isYearly)} />
                </div>
            </div>

            {/* pricing cards */}
            <motion.div
            variants={fadeIn('up', 0.2)} 
            initial='hidden'
            whileInView={'show'}
           viewport={{once: true, amount: 0.5}}
            className='grid lg:grid-cols-3 sm:grid-cols-2 mt-14 md:w-11/12 mx-auto gap-10'>
                {
                    packages.map((item, index) => <div key={index} className='border py-10 md:px-6 px-4 rounded shadow-3xl'>
                        <h3 className='text-3xl font-bold text-primary text-center'>{item.name}</h3>
                        <p className='text-tertiary text-center my'>{item.decription}</p>
                        <p className='mt-5 text-center text-secondary text-4xl font-bold'> {isYearly ? `$${item.yearlyPrice}` : `$${item.monthlyPrice}`}
                            <span className='text-base text-tartiary font-medium'>/{isYearly ? "year" : "month"}</span>
                        </p>
                        <ul className='mt-4  space-y-2 '>
                            <li className='flex items-center gap-3' ><img src={item.green} alt="" className='w-4 h-4 rounded-full' />Video Lessons</li>
                            <li className='flex items-center gap-3' ><img src={item.green} alt="" className='w-4 h-4 rounded-full' />HomeWork Check</li>
                            <li className='flex items-center gap-3' ><img src={item.green} alt="" className='w-4 h-4 rounded-full' />Additional Practice Task</li>
                            <li className='flex items-center gap-3' ><img src={item.green} alt="" className='w-4 h-4 rounded-full ' />Monthly Conferences</li>
                            <li className='flex items-center gap-3' ><img src={item.green} alt="" className='w-4 h-4 rounded-full' />Personal Advice from teachers</li>
                        </ul>
                        <div className='w-full mx-auto flex items-center justify-center  mt-8 '>
                            <button className='btnPrimary'>Get Started</button>
                            </div>
                    </div>)
                }
            </motion.div>

        </div>
    )
}

export default Pricing