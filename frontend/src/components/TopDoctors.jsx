import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    console.log('TopDoctors - doctors array:', doctors)
    console.log('TopDoctors - doctors length:', doctors.length)

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>Top Doctor to Book</h1>
            <p className='sm:w-1/3 text-center text-sm'>
                Simply browse through our extensive list of trusted doctors.
            </p>

            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-5 px-3 sm:px-0 justify-items-center'>
                {doctors && doctors.length > 0 ? (
                    doctors.slice(0, 10).map((item, index) => (
                        <div
                            onClick={() => navigate(`/appointment/${item._id}`)}
                            key={index}
                            className='relative border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 shadow-sm bg-white max-w-sm mx-auto w-full flex flex-row items-center sm:flex-col sm:items-stretch'
                        >
                            <img
                                className='w-28 h-28 sm:w-full sm:h-48 md:h-56 object-cover object-top bg-blue-50 rounded-lg sm:rounded-t-xl flex-shrink-0'
                                src={item.image}
                                alt={item.name}
                            />
                            <div className='p-6 flex-1 w-full'>
                                {/* Availability Indicator */}
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

                                {/* Doctor Info */}
                                <p className='font-medium text-gray-800'>{item.name}</p>
                                <p className='text-sm text-gray-600'>{item.speciality}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-8">
                        <p className="text-gray-500">Loading doctors...</p>
                    </div>
                )}
            </div>

            <button
                onClick={() => {
                    navigate('/doctors');
                    scrollTo(0, 0);
                }}
                className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'
            >
                More
            </button>
        </div>
    )
}

export default TopDoctors
