import React from "react";
import { assets } from "../../assets/assets";
import { useState ,useContext} from "react";
import { AdminContext } from "../../context/AdminContext";
import {toast} from 'react-toastify'
import axios from 'axios'
const AddDoctor = () => {
    const [docImg,setDocImg]=useState(false)
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [experience,setExperience]=useState('1 Year')
    const [fees,setFees]=useState('')
    const [about,setAbout]=useState('')
    const [speciality,setSpeciality]=useState('General Physician')
    const [degree,setDegree]=useState('')
    const [address1,setAddress1]=useState('')
    const [address2,setAddress2]=useState('')

    const{backendUrl,aToken}=useContext(AdminContext)

    const onSubmitHandler =async (event) =>{
        event.preventDefault()
        try {
            if(!docImg){
                return toast.error("Image not selected")
            }

            const formData = new FormData()

            formData.append('image',docImg)
            formData.append('name',name)
            formData.append('email',email)
            formData.append('password',password)
            formData.append('experience',experience)
            formData.append('fee',Number(fees))
            formData.append('about',about)
            formData.append('speciality',speciality)
            formData.append('degree',degree)
            formData.append('address',JSON.stringify({line1:address1,line2:address2}))
             
            formData.forEach((value,key)=>{
                console.log(`${key} : ${value}`);
            })

            const {data} =await axios.post(backendUrl+'/api/admin/add-doctor',formData,{headers:{aToken}})

            if(data.success){
                toast.success(data.message)
            }
            else{
                toast.error(data.message)
            }

        } catch (error) {
            
        }
    }

    return (
        <form action="" className="m-5 w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6">
            <p className="mb-3 text-2xl font-semibold text-gray-800">Add Doctor</p>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center gap-4 bg-gray-50 rounded-lg p-6 shadow-sm w-full md:w-1/3">
                    <label htmlFor="doc-img" className="cursor-pointer flex flex-col items-center gap-2">
                        <img src={docImg ? URL.createObjectURL(docImg) :assets.upload_area} alt="" className="w-24 h-24 object-cover rounded-full border-2 border-gray-200 hover:border-blue-400 transition"  />
                        <span className="text-sm text-gray-500">Click to upload</span>
                    </label>
                    <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
                    <p className="text-center text-gray-600 font-medium">Upload Doctor <br /> Picture</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 w-full md:w-2/3">
                    <div className="flex flex-col gap-4 w-full">
                        <div>
                            <p className="text-gray-700 font-medium mb-1">Doctor Name</p>
                            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="Name" required className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:border-[#0f172a] focus:outline-none transition" />
                        </div>

                        <div>
                            <p className="text-gray-700 font-medium mb-1">Doctor Email</p>
                            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="Email" required className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:border-[#0f172a] focus:outline-none transition" />
                        </div>
                        <div>
                            <p className="text-gray-700 font-medium mb-1">Doctor Password</p>
                            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Password" required className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:border-[#0f172a] focus:outline-none transition" />
                        </div>
                        <div>
                            <p className="text-gray-700 font-medium mb-1">Experience</p>
                            <select onChange={(e)=>setExperience(e.target.value)} value={experience} name="" id="" className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:border-[#0f172a] focus:outline-none transition">
                                <option value="1 Year">1 Year</option>
                                <option value="2 Year">2 Year</option>
                                <option value="3 Year">3 Year</option>
                                <option value="4 Year">4 Year</option>
                                <option value="5 Year">5 Year</option>
                                <option value="6 Year">6 Year</option>
                                <option value="7 Year">7 Year</option>
                                <option value="8 Year">8 Year</option>
                                <option value="9 Year">9 Year</option>
                                <option value="10 Year">10 Year</option>
                            </select>
                        </div>
                        <div>
                            <p className="text-gray-700 font-medium mb-1">Fee</p>
                            <input onChange={(e)=>setFees(e.target.value)} value={fees} type="number" placeholder="Fee" required className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:border-[#0f172a] focus:outline-none transition" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <div>
                            <p className="text-gray-700 font-medium mb-1">Speciality</p>
                            <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} name="" id="" className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:border-[#0f172a] focus:outline-none transition">
                                <option value="General Physician">General Physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatrician</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroentrologist">Gastroentrologist</option>
                            </select>
                        </div>
                        <div>
                            <p className="text-gray-700 font-medium mb-1">Education</p>
                            <input onChange={(e)=>setDegree(e.target.value)} value={degree} type="text" placeholder="Education" required className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:border-[#0f172a] focus:outline-none transition" />
                        </div>
                        <div>
                            <p className="text-gray-700 font-medium mb-1">Address</p>
                            <input onChange={(e)=>setAddress1(e.target.value)} value={address1} type="text" placeholder="address 1" required className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:border-[#0f172a] focus:outline-none transition mb-2" />
                            <input onChange={(e)=>setAddress2(e.target.value)} value={address2} type="text" placeholder="address 2" required className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:border-[#0f172a] focus:outline-none transition" />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p className="text-gray-700 font-medium mb-1">About Doctor</p>
                <textarea onChange={(e)=>setAbout(e.target.value)} value={about} placeholder="write about doctor" rows={5} required className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:border-[#0f172a] focus:outline-none transition resize-none"></textarea>
            </div>
            <button
            onClick={onSubmitHandler}
                type="submit"
                style={{ backgroundColor: '#0f172a' }}
                className="mt-4 text-white font-semibold py-3 rounded-lg shadow-md transition w-full hover:brightness-110"
            >
                Add Doctor
            </button>
        </form>
    )
}

export default AddDoctor