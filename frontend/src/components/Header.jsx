import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-[#0f172a] rounded-lg px-4 md:px-10 w-full my-4'>
        {/*-------------------------Left side------------------------------------*/}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-8 m-auto md:py-[10vw] md:mb-[-30px]'>
            <p className='text-3xl md:text-4xl lg:text-5xl text-[#06b6d4] font-semibold leading-tight md:leading-tight lg:leading-tight text-center md:text-left w-full'>
                Book Appointment <br /> With Trusted Doctors
            </p>
            <div className='flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start text-center md:text-left gap-3 text-[#06b6d4] text-sm font-light'>
                <img className='w-28 mx-auto md:mx-0' src={assets.group_profiles} alt="" />
                <p>simply browse through our extensive list of trusted doctors, <br className='hidden sm:block'/>  schedule your Appointment hassle-free.</p>
            </div>
            <a  href="#speciality" className='flex items-center gap-2 bg-[#0ea5e9] px-6 py-3 rounded-full text-[#f1f5f9] text-base m-auto md:m-0 hover:bg-[#0284c7] transition-all duration-300 w-full md:w-auto justify-center'>
                Book appointment <img className='w-3' src={assets.arrow_icon} alt="" />
            </a>
        </div>
        {/*-------------------------right side------------------------------------*/}
        <div className='md:w-1/2 relative flex justify-center items-center'>
            <img className='w-full max-w-xs md:max-w-full md:absolute bottom-0 h-auto rounded-lg mx-auto' src={assets.header_img} alt="" />
        </div>
    </div>
  )
}

export default Header