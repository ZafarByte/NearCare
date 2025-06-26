import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {
  const{speciality}=useParams()
  const[filterDoc,setFilterDoc]=useState([])
  const navigate =useNavigate()
  const{doctors}=useContext(AppContext)
  const applyFilter = ()=>{
    if(speciality){
      setFilterDoc(doctors.filter(doc=>doc.speciality===speciality))
    }
    else{
      setFilterDoc(doctors)
    }
  }

  useEffect(()=>{
    applyFilter()
  },[doctors,speciality])
  return (
    <div>
      <p className='text-gray-600'>Browse through doctor specialist.</p>
      <div className='flex flex-col items-start gap-5 mt-5 sm:flex-row'>
        <div className='flex flex-col gap-4 text-sm text-gray-600'>
          <p onClick={()=>speciality==='General physician'?navigate('/doctors') : navigate('/doctors/General physician')}className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-10 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="General physician"?"bg-indigo-100 text-black":""}`}>General physician</p>
          <p onClick={()=>speciality==='Gynecologist'?navigate('/doctors') : navigate('/doctors/Gynecologist')}className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Gynecologist"?"bg-indigo-100 text-black":""}`}>Gynecologist</p>
          <p onClick={()=>speciality==='Dermatologist'?navigate('/doctors') : navigate('/doctors/Dermatologist')}className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Dermatologist"?"bg-indigo-100 text-black":""}`}>Dermatologist</p>
          <p onClick={()=>speciality==='Pediatricians'?navigate('/doctors') : navigate('/doctors/Pediatricians')}className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Pediatricians"?"bg-indigo-100 text-black":""}`}>Pediatricians</p>
          <p onClick={()=>speciality==='Neurologist'?navigate('/doctors') : navigate('/doctors/Neurologist')}className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Neurologist"?"bg-indigo-100 text-black":""}`}>Neurologist</p>
          <p onClick={()=>speciality==='Gastroenterologist'?navigate('/doctors') : navigate('/doctors/Gastroenterologist')}className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Gastroenterologist"?"bg-indigo-100 text-black":""}`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-5 px-3 sm:px-0'>
        {
          filterDoc.map((item, index) => (
                    <div onClick={() => navigate(`/appointment/${item._id}`)}
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
      </div>
    </div>
  )
}

export default Doctors