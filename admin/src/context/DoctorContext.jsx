import { createContext, use, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.envVITE_BACKEND_URL
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const [appointments, setAppointments] = useState([])

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:5000/api/doctor/appointments",
                { headers: { dtoken: dToken } }  // ✅ send token properly
            );
            if (data.success) {
                const reversed = [...data.appointments].reverse(); // make a copy first
                setAppointments(reversed);
                console.log("Doctor Appointments:", reversed);
            }
        } catch (error) {
            console.error("Fetch Appointments Error:", error);
            toast.error(error.response?.data?.message || "Failed to fetch appointments");
        }
    };

    const value = {
        dToken,
        setDToken,
        backendUrl,
        getAppointments,
        appointments, setAppointments
    }
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider