import React, { useState, useEffect, useRef, useContext } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const {token, setToken} = useContext(AppContext);
  const [location, setLocation] = useState('Fetching location...');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const logOut=()=>{
    setToken(false)
    localStorage.removeItem('token')
  }
   
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

  useEffect(() => {
    if (showMenu) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
              .then(res => res.json())
              .then(data => {
                const city = data.address.city || data.address.town || data.address.village || data.address.hamlet;
                setLocation(city ? city : data.display_name || 'Location found');
              })
              .catch(() => setLocation('Unable to fetch city'));
          },
          (error) => {
            setLocation('Unable to fetch location');
          }
        );
      } else {
        setLocation('Geolocation not supported');
      }
    }
  }, [showMenu]);

  useEffect(() => {
    if (!showProfileDropdown) return;
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);

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
            <div className='hidden md:flex items-center gap-2 cursor-pointer relative'>
              <img className='w-8 rounded-full' src={assets.profile_pic} alt="Profile" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown" onClick={() => setShowProfileDropdown((prev) => !prev)} />
              {/* Desktop Dropdown */}
              {showProfileDropdown && (
                <div ref={dropdownRef} className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20'>
                  <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                    <p onClick={() => {navigate('my-profile'); setShowProfileDropdown(false);}} className='hover:text-black cursor-pointer'>My Profile</p>
                    <p onClick={() => {navigate('my-appointments'); setShowProfileDropdown(false);}} className='hover:text-black cursor-pointer'>My Appointment</p>
                    <p onClick={() => {logOut(); setShowProfileDropdown(false);}} className='hover:text-black cursor-pointer'>Logout</p>
                  </div>
                </div>
              )}
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

        <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden ' src={assets.menu_icon} alt="" />
        {/* Mobile Menu */}
        <div className={`${showMenu ? 'fixed w-full min-h-screen bg-black/30 z-30 left-0 top-0' : 'h-0 w-0'} md:hidden transition-all`}> 
          <div className={`bg-white shadow-lg rounded-b-2xl w-full max-w-xs ml-auto min-h-screen transition-all duration-300 ${showMenu ? 'translate-x-0' : 'translate-x-full'} fixed right-0 top-0 z-40`}>
            <div className='flex items-center justify-between px-5 py-6 border-b border-gray-100'>
              <img src={assets.logo} alt="Logo" className="h-8 w-auto" />
              <img src={assets.cross_icon} alt="Close" onClick={()=>{setShowMenu(false); setShowProfileDropdown(false);}} className="h-7 w-7 cursor-pointer hover:scale-110 transition-transform duration-200" />
            </div>
            <div className="px-5 py-8 flex flex-col gap-8 h-full justify-between min-h-[60vh]">
              <ul className='flex flex-col gap-6'>
                <NavLink onClick={()=>setShowMenu(false)} to='/' className="text-lg font-semibold text-gray-700 hover:text-[#0f172a] transition-colors duration-200">Home</NavLink>
                <NavLink onClick={()=>setShowMenu(false)} to='/doctors' className="text-lg font-semibold text-gray-700 hover:text-[#0f172a] transition-colors duration-200">All Doctors</NavLink>
                <NavLink onClick={()=>setShowMenu(false)} to='/about' className="text-lg font-semibold text-gray-700 hover:text-[#0f172a] transition-colors duration-200">About</NavLink>
                <NavLink onClick={()=>setShowMenu(false)} to='/contact' className="text-lg font-semibold text-gray-700 hover:text-[#0f172a] transition-colors duration-200">Contact</NavLink>
              </ul>
              {/* Mobile Profile Dropdown */}
              {token ? (
                <div className="flex flex-col gap-2 mt-8">
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowProfileDropdown((prev) => !prev)}>
                    <img className='w-8 rounded-full' src={assets.profile_pic} alt="Profile" />
                    <span className="font-semibold text-gray-700">Account</span>
                    <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown" />
                  </div>
                  {showProfileDropdown && (
                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 mt-2 shadow'>
                      <p onClick={() => {navigate('my-profile'); setShowMenu(false); setShowProfileDropdown(false);}} className='hover:text-black cursor-pointer'>My Profile</p>
                      <p onClick={() => {navigate('my-appointments'); setShowMenu(false); setShowProfileDropdown(false);}} className='hover:text-black cursor-pointer'>My Appointment</p>
                      <p onClick={() => {setToken(false); setShowMenu(false); setShowProfileDropdown(false);}} className='hover:text-black cursor-pointer'>Logout</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-8">
                  <button
                    onClick={() => {navigate('/login'); setShowMenu(false);}}
                    className='bg-[#0f172a] text-white px-6 py-3 rounded-full font-bold text-center'
                  >
                    Create Account
                  </button>
                </div>
              )}
              <div className="flex items-center gap-3 border px-4 py-3 rounded-lg text-gray-600 bg-white shadow mt-8">
                <img src={assets.location} className="w-4 h-4" alt="Location" />
                <span>{location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
