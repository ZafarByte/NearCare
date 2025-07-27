import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorList = () => {
    const { doctors, aToken, getAllDoctors, backendUrl ,changeAvailability} = useContext(AdminContext)
    
    useEffect(() => {
        if (aToken) {
            getAllDoctors()
        }
    }, [aToken])

    const handleToggleAvailability = async (doctorId, newStatus) => {
        try {
            const response = await fetch(`${backendUrl}/api/admin/toggle-doctor-availability`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'aToken': aToken
                },
                body: JSON.stringify({
                    doctorId,
                    available: newStatus
                })
            })
            
            const data = await response.json()
            
            if (data.success) {
                // Refresh the doctors list to show updated status
                getAllDoctors()
            } else {
                console.error('Failed to toggle availability:', data.message)
            }
        } catch (error) {
            console.error('Error toggling availability:', error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-2">
            <div className="max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">All Doctors</h1>
                    <p className="text-gray-600">Manage and view all registered doctors</p>
                </div>

                {/* Doctors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {doctors.map((item, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 ">
                            {/* Doctor Image */}
                            <div className="relative group">
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-48 object-contain bg-gray-100 group-hover:bg-[#0F172A] transition-all duration-300"
                                />
                                <div className="absolute top-4 right-4">
                                    {item.available ? (
                                        <span className='relative flex h-2 w-2'>
                                            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-50'></span>
                                            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                                            <span className='relative inline-flex rounded-full h-2 w-2 bg-green-500'></span>
                                        </span>
                                    ) : (
                                        <span className='relative flex h-2 w-2'>
                                            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-50'></span>
                                            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
                                            <span className='relative inline-flex rounded-full h-2 w-2 bg-red-500'></span>
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Doctor Info */}
                            <div className="p-6">
                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.name}</h3>
                                    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                                        {item.speciality}
                                    </span>
                                </div>

                                {/* Address */}
                                <div className="mb-4">
                                    <div className="flex items-start space-x-2">
                                        <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                        <div className="text-sm text-gray-600">
                                            <p>{item.address.line1}</p>
                                            <p>{item.address.line2}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div className="flex items-center space-x-3">
                                        <span className={`text-sm font-medium ${item.available ? 'text-green-600' : 'text-red-600'}`}>
                                            {item.available ? 'Available' : 'Unavailable'}
                                        </span>
                                        {/* Toggle Button */}
                                        <button 
                                            onClick={() => changeAvailability(item._id)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                                                item.available ? 'bg-green-500' : 'bg-gray-300'
                                            }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                                    item.available ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                            />
                                        </button>
                                    </div>
                                  
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {doctors.length === 0 && (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No doctors found</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by adding a new doctor.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DoctorList