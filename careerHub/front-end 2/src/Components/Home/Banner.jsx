import React from 'react'
// motion
import {motion} from 'framer-motion'
// variant
import {fadeIn} from '../../variants'



const Banner = ({baner, heading, subheading, btn1, btn2}) => {
    return (
        <div className='md:px-14 px-4 max-w-screen-2xl mx-auto mt-[87px]  '>
            <div className='gradientBg rounded-xl rounded-br-[80px] md:p-[68px] px-4 py-9'>
                <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-10'>

                    {/* banner image */}
                    <motion.div
                     variants={fadeIn('down', 0.2)} 
                     initial='hidden'
                     whileInView={'show'}
                    viewport={{once: true, amount: 0.7}} >
                        
                        <img src={baner} alt="" className='h-[250px] lg:h-[350px] pt-[5px] ' />
                    </motion.div>

                    {/* Banner content */}
                    <motion.div 
                    variants={fadeIn('up', 0.2)} 
                    initial='hidden'
                    whileInView={'show'}
                   viewport={{once: true, amount: 0.7}}
                    className='md:w-3/5'>
                        <h2 className='md:text-7xl text-4xl font-bold text-white mb-6 leading-relaxed '>{heading}</h2>
                        <p className=' mb-8 text-2xl font-bold text-orange-400 '>{subheading}</p>
                        <div className='md:space-x-5 space-x-3 y-4 '>
                            {/* <button className='btnPrimary' >{btn1}</button>
                            <button className='btnPrimary' >{btn2}</button> */}
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    )
}

export default Banner
