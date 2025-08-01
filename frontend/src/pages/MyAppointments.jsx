import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
  const { backendUrl, token} = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const months=[" ","jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  const slotsDateFormat =(slotDate)=>{
    const dateArray =slotDate.split('-')
    return dateArray[0]+" "+months[Number(dateArray[1])] +" "+dateArray[2]
  }

  const getUserAppointments = async () => {
    try {
     const { data } = await axios.get(
             `${backendUrl}/api/user/appointments`,
             {
               headers: {
                 token,
               },
             }
           );
      
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      } else {
        toast.error("Failed to fetch appointments");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Error fetching appointments");
    }
  };

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <p className="text-2xl font-semibold text-gray-700 mb-8">My Appointments</p>
      <div className="w-full max-w-3xl flex flex-col gap-8">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow flex flex-col md:flex-row items-center md:items-stretch gap-12 p-8 min-h-[180px] min-w-full"
          >
            <div className="flex-shrink-0 flex items-center justify-center">
              <img
                src={item.docData.image || 'images/user.png'}
                alt={item.docData.name}
                className="w-28 h-28 object-cover rounded-lg border border-gray-200 shadow"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center gap-4 text-gray-700">
              <p className="text-lg font-semibold">{item.docData.name}</p>
              <p className="text-sm text-gray-500">{item.docData.speciality}</p>
              <p className="text-sm font-medium">
                Address: <span className="font-normal">{item.docData.address?.line1}, {item.docData.address?.line2}</span>
              </p>
              <p className="text-sm font-medium">
                Date & Time: <span className="font-normal">{slotsDateFormat(item.slotDate)} | {item.slotTime}</span>
              </p>
            </div>
            <div className="flex flex-col gap-4 justify-center md:justify-end items-stretch md:items-end w-full md:w-auto mt-4 md:mt-0">
              <button className="bg-transparent border border-[#0f172a] text-[#0f172a] px-6 py-2 rounded-full font-medium transition-all duration-300 hover:bg-[#0f172a] hover:text-white">
                Pay Online
              </button>
              <button className="bg-transparent border border-red-500 text-red-500 px-6 py-2 rounded-full font-medium transition-all duration-300 hover:bg-red-500 hover:text-white">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
