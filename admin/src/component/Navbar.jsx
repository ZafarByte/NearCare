import React, { useContext } from "react"
import { assets } from "../assets/assets"
import { AdminContext } from "../context/AdminContext"
import { useNavigate } from "react-router-dom"

const Navbar=()=>{
    const {aToken,setAToken} = useContext(AdminContext)
   
    const navigate=useNavigate()

    const logout = () =>{
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
    }
    return(
        <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
          <div className="flex items-center gap-2 text-xs">
            <img className="w-36 sm:w-40 cursr-pointer"  src={assets.logo} alt="" />
            <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
                {aToken ? 'Admin' : 'Doctor'}
            </p>
          </div>
          <button onClick={logout}  className="bg-[#0f172a] text-white text-sm px-10 py-2 rounded-full">Logout</button>
        </div>
    )
}

export default Navbar