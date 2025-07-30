import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets.js'
import axios from 'axios'
import { toast } from 'react-toastify'
const MyProfile = () => {

  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)


  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      image && formData.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return userData && (



    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      {
        isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer w-36 h-36">
              {/* Profile Image */}
              <img
                src={image ? URL.createObjectURL(image) : userData.image || assets.upload_icon}
                alt="Profile"
                className="w-36 h-36 rounded-full shadow mb-2 object-cover border-4 border-gray-200"
              />
              {/* Optional Upload Icon Overlay */}
              <div className="absolute bottom-1 right-1 bg-[#0f172a] p-1 rounded-full shadow">
                <img src={assets.upload_icon} alt="Upload" className="w-6 h-6" />
              </div>
            </div>
            <input
              type="file"
              id="image"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        ) : (
          <img
            src={userData.image}
            alt="Profile"
            className="w-36 h-36 rounded-full shadow mb-2 object-cover border-4 border-gray-200"
          />
        )
      }

      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8 flex flex-col items-center gap-6">
        {
          isEdit
            ? <div className="flex flex-row items-center gap-2 w-full justify-center">
              <span className="text-xl font-semibold text-gray-700">Name</span>
              <span className="font-bold">:</span>
              <input type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                className="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 focus:outline-none focus:border-[#0f172a] bg-gray-50 px-2 py-1 rounded mb-2" />
            </div>
            : <div className="flex flex-row items-center gap-2 w-full justify-center">
              <span className="text-2xl font-semibold text-gray-700">Name</span>
              <span className="font-bold">:</span>
              <span className="text-2xl text-gray-700">{userData.name}</span>
            </div>
        }
        <hr className="w-full border-gray-200 my-2" />
        <div className="w-full">
          <p className="text-lg font-medium text-gray-700 mb-3">Contact Information</p>
          <div className="flex flex-col gap-4 text-gray-600">
            <div className="flex flex-row items-center gap-2">
              <span className="font-medium">Email</span>
              <span className="font-bold">:</span>
              <span>{userData.email}</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <span className="font-medium">Phone</span>
              <span className="font-bold">:</span>
              {
                isEdit
                  ? <input type="text" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                    className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-[#0f172a]" />
                  : <span>{userData.phone}</span>
              }
            </div>
            <div className="flex flex-row items-center gap-2 flex-wrap">
              <span className="font-medium">Address</span>
              <span className="font-bold">:</span>
              {
                isEdit
                  ? <span className="flex flex-col gap-1">
                    <input type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-[#0f172a] mb-1" />
                    <input type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-[#0f172a]" />
                  </span>
                  : <span>{userData.address.line1}, {userData.address.line2}</span>
              }
            </div>
          </div>
        </div>
        <div className="w-full mt-6">
          <p className="text-lg font-medium text-gray-700 mb-3">Basic Information</p>
          <div className="flex flex-col gap-4 text-gray-600">
            <div className="flex flex-row items-center gap-2">
              <span className="font-medium">Gender</span>
              <span className="font-bold">:</span>
              {
                isEdit
                  ? <select onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-[#0f172a]">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  : <span>{userData.gender}</span>
              }
            </div>
            <div className="flex flex-row items-center gap-2">
              <span className="font-medium">Birthday</span>
              <span className="font-bold">:</span>
              {
                isEdit
                  ? <input type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-[#0f172a]" />
                  : <span>{userData.dob}</span>
              }
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-8">
          {
            isEdit
              ? <button onClick={updateUserProfileData} className="bg-[#0f172a] text-white px-8 py-2 rounded-full font-medium hover:scale-105 transition-all duration-300">Save Information</button>
              : <button onClick={() => setIsEdit(true)} className="bg-[#0f172a] text-white px-8 py-2 rounded-full font-medium hover:scale-105 transition-all duration-300">Edit</button>
          }
        </div>
      </div>
    </div>
  )
}

export default MyProfile