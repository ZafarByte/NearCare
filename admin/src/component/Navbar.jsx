import React, { useContext } from "react"
import { assets } from "../assets/assets"
import { AdminContext } from "../context/AdminContext"
import { useNavigate } from "react-router-dom"
import { DoctorContext } from "../context/DoctorContext"

const Navbar = () => {
    const { aToken, setAToken } = useContext(AdminContext)
    const { dToken, setDToken } = useContext(DoctorContext)
    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
    }
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center px-2 sm:px-10 py-2 sm:py-3 border-b bg-white gap-2 sm:gap-0">
            <div className="flex items-center gap-2 text-xs w-full sm:w-auto justify-between sm:justify-start">
                <img
                    className="w-28 sm:w-40 cursor-pointer"
                    src={assets.logo}
                    alt=""
                />
                <p className="border px-2 py-0.5 rounded-full border-gray-500 text-gray-600 text-xs sm:text-sm">
                    {aToken ? 'Admin Panel' : 'Doctor'}
                </p>
            </div>
            <button
                onClick={logout}
                className="bg-[#0f172a] text-white text-xs sm:text-sm px-6 sm:px-10 py-2 rounded-full cursor-pointer w-full sm:w-auto"
            >
                Logout
            </button>
        </div>
    )
}

export default Navbar