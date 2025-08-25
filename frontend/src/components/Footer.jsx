import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/*-----left section----*/}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt="" />
               <p className='w-full md:w-2/3 text-gray-600 leading-6'>
NearCare is a modern doctor appointment booking platform designed to simplify healthcare access. It allows patients to easily find doctors, schedule appointments, and make secure online payments, eliminating long queues and reducing administrative hassles. With a focus on convenience and efficiency, NearCare ensures timely medical care while keeping patient records organized and accessible.
</p>

            </div>
            {/*-----center section----*/}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            {/*-----right section----*/}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+12-345-678</li>
                    <li>nearCare@mail.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Designed and Developed with ❤️ By Mohammad Zafar Gayas</p>
        </div>
    </div>
  )
}

export default Footer