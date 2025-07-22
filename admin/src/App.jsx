import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './pages/Login'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import { AppContext } from './context/AppContext'
import { useContext } from 'react'
import { AdminContext } from './context/AdminContext'
import Navbar from './component/Navbar'

function App() {
  const {aToken}=useContext(AdminContext)
  
  return  aToken ?(
   <div>
    <div className='bg-[#F8F9FD]'>
    <ToastContainer/>
    <Navbar/>
    </div>
   
   </div>
  ) : (
    <>
       <Login/>
       <ToastContainer/>
    </>
  )
}

export default App
