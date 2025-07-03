import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ speciality, docId }) => {
  const{doctors} = useContext(AppContext)  
  const navigate = useNavigate(); 
  const[relDoc,setRelDocs]= useState([])

  useEffect(()=>{
    if(doctors.length> 0 && speciality){
        const doctorsData = doctors.filter((doc)=> doc.speciality===speciality  && doc._id !==docId)
        setRelDocs(doctorsData)
    }
  },[doctors,speciality,docId])
  return (
    <div>
          <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>Top Doctor to Book</h1>
            <p className='sm:w-1/3 text-center text-sm'>
                Simply browse through our extensive list of trusted doctors.
            </p>

            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-5 px-3 sm:px-0'>
                {relDoc.slice(0, 5).map((item, index) => (
                    <div onClick={() => {navigate(`/appointment/${item._id}`) ; scrollTo(0,0)}}
                        key={index}
                        className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 shadow-sm bg-white'
                    >
                        <img
                            className='w-full h-48 object-cover object-top bg-blue-50'
                            src={item.image}
                            alt={item.name}
                        />
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-green-500 mb-1'>
                                <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                                <p>Available</p>
                            </div>
                            <p className='font-medium text-gray-800'>{item.name}</p>
                            <p className='text-sm text-gray-600'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={()=>{navigate('/doctors');  scrollTo(0,0)}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>
                More
            </button>
        </div>
    </div>
  )
}

export default RelatedDoctors