import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {
  const {doctors} = useContext(AppContext)
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <p className="text-2xl font-semibold text-gray-700 mb-8">My Appointments</p>
      <div className="w-full max-w-3xl flex flex-col gap-8">
        {doctors.slice(0,2).map((item,index)=>(
          <div key={index} className="bg-white rounded-lg shadow flex flex-col md:flex-row items-center md:items-stretch gap-12 p-8 min-h-[180px] min-w-full">
            <div className="flex-shrink-0 flex items-center justify-center">
              <img src={item.image} alt="" className="w-28 h-28 object-cover rounded-lg border border-gray-200 shadow" />
            </div>
            <div className="flex-1 flex flex-col justify-center gap-4 text-gray-700">
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">{item.specialization}</p>
              <p className="text-sm font-medium">Address: <span className="font-normal">{item.address.line1}, {item.address.line2}</span></p>
              <p className="text-sm font-medium"><span className="font-normal">Date & Time:</span> 1st August 2025, 10:00 AM</p>
            </div>
            <div className="flex flex-col gap-4 justify-center md:justify-end items-stretch md:items-end w-full md:w-auto mt-4 md:mt-0">
              <button className="bg-transparent border border-[#0f172a] text-[#0f172a] px-6 py-2 rounded-full font-medium transition-all duration-300 hover:bg-[#0f172a] hover:text-white">Pay Online</button>
              <button className="bg-transparent border border-red-500 text-red-500 px-6 py-2 rounded-full font-medium transition-all duration-300 hover:bg-red-500 hover:text-white">Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments