import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'

const DoctorAppointments = () => {
  const { dToken, getAppointments, appointments } = useContext(DoctorContext)

  useEffect(() => {
    if (dToken) {
           getAppointments()
    }
  }, [dToken])

  return (
    <div>
      <p>All Appointmen</p>
    </div>
  )
}

export default DoctorAppointments
