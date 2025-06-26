import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);
  const [location, setLocation] = useState('Fetching location...');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          const address = data.address;
          const city = address.city || address.town || address.village || '';
          const state = address.state || '';
          const country = address.country || '';

          setLocation(`${city}`);
        } catch (error) {
          console.error('Reverse geocoding error:', error);
          setLocation('Location not available');
        }
      },
      (error) => {
        console.warn('Geolocation error:', error.message);
        setLocation('Permission denied');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, []);

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      {/* Logo */}
      <img onClick={()=>navigate('/')} src={assets.logo} alt="Logo" className='w-44 cursor-pointer' />

      {/* Navigation Links */}
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'><li className='py-1'>HOME</li></NavLink>
        <NavLink to='/doctors'><li className='py-1'>ALL DOCTORS</li></NavLink>
        <NavLink to='/about'><li className='py-1'>ABOUT</li></NavLink>
        <NavLink to='/contact'><li className='py-1'>CONTACT</li></NavLink>
      </ul>

      {/* Right Side: Auth + Location */}
      <div className='flex items-center gap-4'>
        {
          token ? (
            <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 rounded-full' src={assets.profile_pic} alt="Profile" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointment</p>
                  <p onClick={() => setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className='bg-[#0f172a] text-white px-8 py-3 rounded-full font-bold hidden md:block'
            >
              Create account
            </button>
          )
        }

        {/* 📍 Current Location */}
        <div className="hidden md:flex items-center text-gray-700 text-sm font-medium gap-1">
          <img src={assets.location} className="w-4 h-4" alt="Location" />
          <span>{location}</span> {/* replace with your actual location text */}
        </div>

      </div>
    </div>
  );
};

export default Navbar;
