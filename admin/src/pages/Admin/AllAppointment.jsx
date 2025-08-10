import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointment = () => {
    const { aToken, appointments, getAllAppointments ,cancelAppointment} = useContext(AdminContext);
    const { calculateAge, slotsDateFormat, currencySymbol } = useContext(AppContext);

    useEffect(() => {
        if (aToken) {
            getAllAppointments();
        }
    }, [aToken]);



    return (
        <div className="w-full max-w-6xl m-2">
            <p className="mb-3 text-lg font-semibold">All Appointments</p>

            <div className="bg-white border rounded-lg text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll shadow-sm">
                
                {/* Table Header */}
                <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_2fr_1fr_1fr] py-3 px-6 border-b bg-gray-50 font-medium text-gray-700">
                    <p>#</p>
                    <p>Patient</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Doctor</p>
                    <p>Fees</p>
                    <p>Actions</p>
                </div>

                {/* Table Rows */}
                {appointments?.map((item, index) => (
                    <div
                        key={index}
                        className={`flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_2fr_1fr_1fr] items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-50 transition-colors ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                    >
                        {/* # */}
                        <p className="max-sm:hidden">{index + 1}</p>

                        {/* Patient */}
                        <div className="flex items-center gap-2">
                            <img
                                src={item.userData?.image || "/default-avatar.png"}
                                alt={item.userData?.name}
                                className="w-10 h-10 rounded-full "
                            />
                            <p className="truncate max-w-[150px]">{item.userData?.name}</p>
                        </div>

                        {/* Age */}
                        <p className="max-sm:hidden">{calculateAge(item.userData?.dob)}</p>

                        {/* Date & Time */}
                        <p>{slotsDateFormat(item.slotDate)},{item.slotTime}</p>

                        {/* Doctor */}
                        <div className="flex items-center gap-2">
                            <img
                                src={item.docData?.image || "/default-avatar.png"}
                                alt={item.docData?.name}
                                className="w-10 h-10 rounded-full  bg-gray-200"
                            />
                            <p className="truncate max-w-[150px]">{item.docData?.name}</p>
                        </div>

                        {/* Fees */}
                        <p>{currencySymbol}{item.amount}</p>
                        {item.cancelled 
                        ? <p className="text-red-500 font-medium">Cancelled</p>
                        : <img onClick={()=>cancelAppointment(item._id)} className="w-10 cursor-pointer" src={assets.cancel_icon} alt="" />
                        }
                       
                       
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllAppointment;
