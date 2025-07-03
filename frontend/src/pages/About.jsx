import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500 '>
        <p >ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12 '>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 w md:w-2/4 text-sm text-gray-600'>
          <p>
            Welcome to NearCare – Your Neighborhood Health Companion
            NearCare is your trusted partner in healthcare, bringing essential medical services closer to your home. We are committed to simplifying the way you access quality care by connecting you with verified doctors, clinics, and health professionals in your local area. Whether you need a general check-up, specialist consultation, or home-based care, NearCare makes it easy to find and book the right services with just a few clicks.
          </p>
          <p>
            At NearCare, we understand the importance of timely medical attention and personalized support. Our platform is designed to offer seamless appointment scheduling, transparent reviews, and real-time availability of healthcare providers near you. We bridge the gap between patients and healthcare professionals, ensuring you receive the care you need when you need it — without the long waits or travel hassles.
          </p>
          <b className='text-gray-800'>Our Vision</b>
          <p>
            Our mission is to empower communities by making healthcare more accessible, efficient, and people-centric. Whether you’re looking for primary care, pediatricians, dental services, or wellness experts, NearCare is here to guide you every step of the way. With our user-friendly platform and community-driven approach, we’re redefining what it means to care — right in your neighborhood.
          </p>
        </div>
      </div>
      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#0f172a] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Efficiency:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='border px-10 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#0f172a] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Convenience:</b>
          <p>Aceess to a network of entrusted healthcare professionals in your area.</p>
        </div>
        <div className='border px-10 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#0f172a] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Personalization:</b>
          <p>Tailored recommendation and reminder to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About