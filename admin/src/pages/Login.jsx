import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import {useState} from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [state,setState]=useState('Admin')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {setAToken,backendUrl}=useContext(AdminContext)

  const onSubmitHandler=async(event)=>{
    event.preventDefault()
    try {
       if(state==='Admin'){
         const {data}=await axios.post(`${backendUrl}/api/admin/admin-login`,{email,password})
         if(data.success){
            toast.success(data.message)
            localStorage.setItem('aToken',data.token)
            setAToken(data.token)
         }
         else{
            toast.error(data.message)
         }
       }else{

       }
    } catch (error) {
      
    }
  }



  return (
    <div>
       <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-[#dadada] rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
            <p className='text-2xl font-semibold m-auto '><span className='text-[#0f172a]'>{state}</span> Login</p>
            <div className='w-full'>
                <p>Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#dadada] rounded w-full p-2 mt-1 ' type="email" required />
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#dadada] rounded w-full p-2 mt-1 ' type="password" required />
            </div>
            <button className='bg-[#0f172a] text-white w-full py-2 rounded-md text-base'>Login</button>
            {
                state==='Admin' ? <p >Doctor Login ? <span className='cursor-pointer text-[#0f172a] underline' onClick={()=>setState('Doctor')}>Click here</span></p>
                                :  <p>Admin Login ? <span className='cursor-pointer text-[#0f172a] underline' onClick={()=>setState('Admin')}>Click here</span></p>
            }
        </div>
       </form>
    </div>
  )
}

export default Login