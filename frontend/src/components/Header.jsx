import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-[#0f172a] rounded-lg px-6 md:px-10'>
        {/*-------------------------Left side------------------------------------*/}
        <div className='md:w-1/2 flex flex-col items-start justify-center  gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
            <p className='text-3xl md:text-4xl lg:text-5xl text-[#06b6d4] font-semibold leading-tight md:leading-tight lg:leading-tight'>
                Book Appointment <br /> With Trusted Doctors
            </p>
            <div className='flex flex-col md:flex-row item-center gap-3 text-[#06b6d4] text-sm font-light'>
                <img className='w-28' src={assets.group_profiles} alt="" />
                <p>simply browse through our extensive list of trusted doctors, <br className='hidden sm:block'/>  schedule your Appointment hassle-free.</p>
            </div>
            <a  href="#speciality" className='flex items-center gap-2 bg-[#0ea5e9] px-8 py-3 rounded-full text-[#f1f5f9] text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300 '>
                Book appointment <img className='w-3' src={assets.arrow_icon} alt="" />
            </a>
        </div>
        {/*-------------------------right side------------------------------------*/}
        <div className='md:w-1/2 relative'>
            <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
        </div>
    </div>
  )
}

export default Header