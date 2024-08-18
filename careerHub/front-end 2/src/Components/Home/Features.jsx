import React from 'react'
import feature from '../../assets/feature.png'
// motion
import {motion} from 'framer-motion'
// variant
import {fadeIn} from '../../variants'

const Features = () => {
    return (
        <div className='my-14 md:px-12 px-4 max-w-screen-2xl mx-auto' id='features'>
            <div className='flex flex-col lg:flex-row justify-between items-start gap-12'>
                <motion.div 
                variants={fadeIn('right', 0.2)} 
                initial='hidden'
                whileInView={'show'}
               viewport={{once: true, amount: 0.7}}
                className='lg:w-1/4'>
                    <h3 className='text-2xl text-primary font-bold lg:w-full mt-3 '>Why we are better than
                        others</h3>
                    <p className='text-base text-tertiary'>Our platform stands out by seamlessly integrating job listings, industry-relevant courses, and personalized career counseling into one user-friendly experience. With real-time job opportunities, expert-led courses to enhance your skills, and a 24/7 career counseling chatbot for tailored advice, we provide a comprehensive solution for all your career needs.</p>
                </motion.div>

                {/* features cards */}
                <motion.div
                variants={fadeIn('up', 0.2)} 
                initial='hidden'
                whileInView={'show'}
               viewport={{once: true, amount: 0.7}}
                className='w-full lg:w-3/4'>
                   <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start md:gap-10 gap-8'>
                   <div className='bg-[rgba(255,255,255,0.04)] rounded-[35px] h-96 shadow-3xl p-8
                         items-center flex justify-center hover:translate-y-4 transition-all duration-300 cursor-pointer'>
                        <div >
                            <img  src={feature} alt='' />
                            <a className='text-2xl font-bold text-primary  text-center mt-5' href="/jobs">Providing Jobs</a>
                        </div>
                    </div>

                    <div className='bg-[rgba(255,255,255,0.04)] rounded-[35px] h-96 shadow-3xl p-8
                         items-center flex justify-center hover:translate-y-4 transition-all duration-300 cursor-pointer md:mt-16'>
                        <div >
                            <img src={feature} alt='' />
                            <a className='text-2xl font-bold text-primary  text-center mt-5' href="/counselling">Career Counselling</a>
                        </div>
                    </div>

                    <div className='bg-[rgba(255,255,255,0.04)] rounded-[35px] h-96 shadow-3xl p-8
                         items-center flex justify-center hover:translate-y-4 transition-all duration-300 cursor-pointer'>
                        <div >
                            <img  src={feature} alt='' />
                            <a className='text-2xl font-bold text-primary  text-center mt-5' href="/learning">E-Learning Plateform</a>
            
                        </div>
                    </div>
                   </div>

                    

                </motion.div>
            </div>
        </div>

    )
}

export default Features