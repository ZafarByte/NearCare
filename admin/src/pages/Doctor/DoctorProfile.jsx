import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";

const DoctorProfile = () => {
  const { dToken, getProfileData, profileData, setProfileData } = useContext(DoctorContext);
  const { backendUrl } = useContext(AdminContext);
  const [isEdit, setIsEdit] = useState(false)

const updateProfile = async () => {
  try {
    const updateData = {
      address: profileData.address,
      fees: profileData.fees,
      available: profileData.available
    };

    const { data } = await axios.post(
      `${backendUrl}/api/doctor/update-profile`,
      updateData,
      { headers: { dtoken: dToken } }
    );

    if (data.success) {
      toast.success(data.message);
      setIsEdit(false);
      getProfileData(); // refresh profile after update
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
    console.error("Update profile error:", error.message);
  }
};


  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  // Toggle availability
  const toggleAvailability = () => {
    setProfileData((prev) => ({
      ...prev,
      available: !prev.available,
    }));
  };

  return (
    profileData && (
      <div >
        <div className="flex flex-col gap-4 m-5">
          {/* Doctor Image */}
          <div className="flex  mb-4">
            <img
              src={profileData.image || "/images/user.png"}
              alt="Doctor"
              className="bg-[#0f172a]  w-full sm:max-w-54 rounded-lg"
            />
          </div>

          {/* Doctor Info */}
          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">{profileData.name}</p>
            <p className="flex items-center gap-2 mt-1 text-gray-600">
              {profileData.degree} - {profileData.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {profileData.experience} Years Experience
            </button>


            {/* About */}
            <div className="mt-6">
              <p className="flex item-center gap-1 text-sm font-medium text-neutral-800 mt-3">About</p>
              <p className="text-sm test-gray-600 maxw-[700px] mt-1">{profileData.about}</p>
            </div>

            {/* Fee */}
            <p className="text-gray-600 font-medium mt-4">
              Appointment Fee: <span className="text-gray-800">₹{isEdit ? <input type="number" value={profileData.fees} onChange={(e) => setProfileData({ ...profileData, fees: e.target.value })} /> : profileData.fees}</span>
            </p>

            {/* Address */}
            <div className="flex gap-2 py-2 pt-2">
              <p className="font-medium text-gray-800">Address:</p>
              <p className="text-sm">{isEdit ? <input type="text" value={profileData.address.line1} onChange={(e) => setProfileData({ ...profileData, address: { ...profileData.address, line1: e.target.value } })} /> : profileData.address.line1} <br />  {isEdit ? <input type="text" value={profileData.address.line2} onChange={(e) => setProfileData({ ...profileData, address: { ...profileData.address, line2: e.target.value } })} /> : profileData.address.line2}</p>

            </div>

            {/* Availability Toggle */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
              <span
                className={`text-sm font-medium ${profileData.available ? "text-green-600" : "text-red-600"
                  }`}
              >
                {profileData.available ? "Available" : "Unavailable"}
              </span>

              {/* Toggle Button */}
              <button
                onClick={toggleAvailability}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${profileData.available ? "bg-green-500" : "bg-gray-300"
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${profileData.available ? "translate-x-6" : "translate-x-1"
                    }`}
                />
              </button>
            </div>
            {isEdit ? (
              <button
                onClick={updateProfile}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-[#0f172a] hover:text-white transition-all cursor-pointer"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-[#0f172a] hover:text-white transition-all cursor-pointer"
              >
                Edit
              </button>
            )}


          </div>
        </div>
      </div>

    )
  );
};

export default DoctorProfile;
