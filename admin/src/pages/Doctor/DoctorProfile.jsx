import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

const DoctorProfile = () => {
  const { dToken, getProfileData, profileData, setProfileData } = useContext(DoctorContext);
  const { backendUrl } = useContext(AppContext);

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
        <div className="flex justify-center mb-4">
          <img
            src={profileData.image || "/images/user.png"}
            alt="Doctor"
            className="w-28 h-28 rounded-full object-cover border-2 border-indigo-500"
          />
        </div>

        {/* Doctor Info */}
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-800">{profileData.name}</p>
          <p className="text-gray-600">
            {profileData.degree} - {profileData.speciality}
          </p>
          <button className="mt-2 px-4 py-1 bg-indigo-500 text-white rounded-full shadow">
            {profileData.experience} Years Experience
          </button>
        </div>

        {/* About */}
        <div className="mt-6">
          <p className="font-medium text-gray-800">About</p>
          <p className="text-gray-600">{profileData.about}</p>
        </div>

        {/* Fee */}
        <p className="mt-4 text-gray-800">
          Appointment Fee: <span className="font-semibold">₹{profileData.fees}</span>
        </p>

        {/* Address */}
        <div className="mt-4">
          <p className="font-medium text-gray-800">Address:</p>
          <p className="text-gray-600">{profileData.address.line1}</p>
          <p className="text-gray-600">{profileData.address.line2}</p>
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <span
            className={`text-sm font-medium ${
              profileData.available ? "text-green-600" : "text-red-600"
            }`}
          >
            {profileData.available ? "Available" : "Unavailable"}
          </span>

          {/* Toggle Button */}
          <button
            onClick={toggleAvailability}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
              profileData.available ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                profileData.available ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
      
    )
  );
};

export default DoctorProfile;
