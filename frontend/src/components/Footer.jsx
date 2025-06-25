import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my'>
            {/*-----left section----*/}
            <div>
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae hic possimus facilis quas necessitatibus harum voluptate voluptatibus. Veniam, recusandae? Iure adipisci eligendi tempore doloremque ea!</p>
            </div>
            {/*-----center section----*/}
            <div>
                <p>COMPANY</p>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            {/*-----right section----*/}
            <div>
                <p>GET IN TOUCH</p>
                <ul>
                    <li>+12-345-678</li>
                    <li>nearCare@mail.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr />
            <p>Designed and Developed with ❤️ By Mohammad Zafar Gayas</p>
        </div>
    </div>
  )
}

export default Footer