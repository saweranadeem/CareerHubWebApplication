import React from 'react'
import about from '../../assets/about.jpg'
import about2 from '../../assets/about2.jpg'
import chatbot from "../../assets/chatbot.png"
// motion
import { motion } from 'framer-motion'
// variant
import { fadeIn } from '../../variants'

const About = () => {
  return (
    <div className='md:px-14 p-4 max-w-s mx-auto space-y-8' id='about'>
      <div className='flex flex-col md:flex-row justify-between items-center gap-8' >  
        <motion.div
          variants={fadeIn('right', 0.2)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: true, amount: 0.7 }}
          className='md:w-1/2'>
          <img src={about} alt="" />
        </motion.div>
        {/* about content */}
        <motion.div
          variants={fadeIn('left', 0.3)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: true, amount: 0.7 }}
          className='md:w-2/5'>
          <h2 className='md:text-5xl text-xl font-bold text-primary mb-5 leading-normal'> Expand your knowledge with our <span className='text-secondary'>top rated courses.</span></h2>
          <p className='text-tertiary text-lg mb-7'>Gain new skills and boost your career prospects today! </p>
        </motion.div>
      </div>

      {/* 2nd part */}
     <div className='flex flex-col md:flex-row justify-between items-center gap-8 '>
     <motion.div
        variants={fadeIn('right', 0.2)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: true, amount: 0.7 }}
        className='flex flex-col md:flex-row-reverse justify-between items-center gap-8 my-8' >
        <div className='md:w-1/2 ' >
          <div className='md:w-1/2 md:ml-40  '>
            <img src={chatbot} alt="" className='h-[300px] w-[300px] rounded-3xl ' />
          </div>
        </div>
        {/* about content */}
        <div className='md:w-2/5'>
          <h2 className='md:text-5xl text-base font-bold text-primary mb-5 leading-normal'> Welcome to your personalized  <span className='text-secondary'>career counseling assistant!</span></h2>
          <p className='text-tertiary text-lg mb-7'>Whether you're exploring new career paths,refining your resume, or seeking advice on job interviews, I'm here to help you every step  of the way. Just ask, and let's start building your future together! </p>
        </div>
      </motion.div>
     </div>

      {/* 3rd part */}
      <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-8'>
      <motion.div
        variants={fadeIn('right', 0.2)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: true, amount: 0.7 }}
        className='flex flex-col md:flex-row justify-between items-center gap-8 mb-4' >
        <div className='md:w-1/2'>
          <img src={about2} alt="" />
        </div>
        {/* about content */}
        <div className='md:w-2/5 '>
          <h2 className='md:text-5xl text-xl font-bold text-primary mb-5 leading-normal'>Discover exciting career opportunities <span className='text-secondary'>tailored just for you.</span></h2>
          <p className='text-tertiary text-lg mb-7'>Find your next job and take the next step in your professional journey </p>
        </div>
      </motion.div>
      </div>
    </div>

  )
}

export default About