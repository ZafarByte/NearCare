import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './pages/Login'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import { AppContext } from './context/AppContext'
import { useContext } from 'react'
import { AdminContext } from './context/AdminContext'
import { DoctorContext } from './context/DoctorContext'
import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard'
import AllAppointment from './pages/Admin/AllAppointment'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorList from './pages/Admin/DoctorList'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
function App() {
  const {aToken}=useContext(AdminContext)
  const {dToken}=useContext(DoctorContext)
  return  aToken || dToken?(
   <div>
    <div className='bg-[#F8F9FD]'>
    <ToastContainer/>
    <Navbar/>
    <div className='flex items-start'>
      <Sidebar></Sidebar>
      <div className='ml-10 w-full'>
        <Routes>
          {/*Admin Route*/}
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/all-appointments' element={<AllAppointment/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/doctor-lists' element={<DoctorList/>}/>
          {/*Doctor Route*/}
          <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
          <Route path='/doctor-appointments' element={<DoctorAppointments/>}/>
          <Route path='/doctor-profile' element={<DoctorProfile/>}/>
        </Routes>
      </div>
    </div>
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
