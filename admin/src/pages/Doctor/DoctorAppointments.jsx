import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {
  const { dToken, getAppointments, appointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)

  const { calculateAge, slotsDateFormat } = useContext(AppContext)
  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken, getAppointments])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        {/* Table header */}
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b font-medium'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Table rows */}
        {
          appointments.length > 0 ? (
            appointments.map((item, index) => (
              <div
                key={index}
                className='grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b items-center'
              >
                {/* Index */}
                <p>{index + 1}</p>

                {/* Patient Info */}
                <div className='flex items-center gap-2'>
                  <img
                    src={item.userData?.image || '/default-avatar.png'}
                    alt="patient"
                    className='w-8 h-8 rounded-full object-cover'
                  />
                  <p>{item.userData?.name || 'Unknown'}</p>
                </div>

                {/* Payment */}
                <p>{item.Payment ? 'Online' : 'Cash'}</p>

                {/* Age */}
                <p className='hidden md:block'>{calculateAge(item.userData.dob)}</p>

                {/* Date & Time */}
                <p>{slotsDateFormat(item.slotDate)} {item.slotTime}</p>

                {/* Fees */}
                <p>₹{item.amount || '-'}</p>
                {
                  item.cancelled ? <p className='text-red-500 text-xs font-medium'>Cancelled</p> : item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p> : <div className='flex'>
                    <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                    <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                  </div>
                }
                {/* Action */}

              </div>
            ))
          ) : (
            <p className='text-center py-5 text-gray-500'>No appointments found</p>
          )
        }
      </div>
    </div>
  )
}

export default DoctorAppointments
