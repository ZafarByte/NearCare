import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!docImg) return toast.error("Image not selected");
      if (!fees || isNaN(Number(fees))) return toast.error("Fee must be a valid number");
      if (!name) return toast.error("Please enter the doctor's name");
      if (!email) return toast.error("Please enter the email");
      if (!password) return toast.error("Please enter the password");
      if (!degree) return toast.error("Please enter the degree");
      if (!about) return toast.error("Please provide some information in 'about'");
      if (!address1) return toast.error("Please enter address line 1");
      if (!address2) return toast.error("Please enter address line 2");
      if (!city) return toast.error("Please enter doctor City");
      if (!experience) return toast.error("Please enter the experience");
      if (!fees) return toast.error("Please enter the consultation fees");
      if (!speciality) return toast.error("Please enter the speciality");

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("city", city);
      formData.append("address", JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setAddress1("");
        setDegree("");
        setAbout("");
        setFees("");
        setCity("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="m-5 w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 flex flex-col gap-6"
    >
      <p className="mb-3 text-2xl font-semibold text-gray-800">Add Doctor</p>

      {/* Doctor Image + Form Fields */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Upload Image Section */}
        <div className="flex flex-col items-center gap-4 bg-gray-50 rounded-lg p-6 shadow-sm w-full lg:w-1/3">
          <label
            htmlFor="doc-img"
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
              className="w-24 h-24 object-cover rounded-full border-2 border-gray-200 hover:border-blue-400 transition"
            />
            <span className="text-sm text-gray-500">Click to upload</span>
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p className="text-center text-gray-600 font-medium">
            Upload Doctor <br /> Picture
          </p>
        </div>

        {/* Doctor Form Fields */}
        <div className="flex flex-col gap-6 w-full lg:w-2/3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700 font-medium mb-1">Doctor Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name"
                required
                className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:border-[#0f172a] focus:outline-none transition"
              />
            </div>
            <div>
              <p className="text-gray-700 font-medium mb-1">Doctor Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                required
                className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:border-[#0f172a] focus:outline-none transition"
              />
            </div>
            <div>
              <p className="text-gray-700 font-medium mb-1">Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
                className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:border-[#0f172a] focus:outline-none transition"
              />
            </div>
            <div>
              <p className="text-gray-700 font-medium mb-1">Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:border-[#0f172a] focus:outline-none transition"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={`${i + 1} Year`}>
                    {i + 1} Year
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-gray-700 font-medium mb-1">Fee</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                type="number"
                placeholder="Fee"
                required
                className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:border-[#0f172a] focus:outline-none transition"
              />
            </div>
            <div>
              <p className="text-gray-700 font-medium mb-1">Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:border-[#0f172a] focus:outline-none transition"
              >
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroentrologist">Gastroentrologist</option>
              </select>
            </div>
            <div>
              <p className="text-gray-700 font-medium mb-1">Education</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                type="text"
                placeholder="Education"
                required
                className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:border-[#0f172a] focus:outline-none transition"
              />
            </div>
            <div>
              <p className="text-gray-700 font-medium mb-1">City</p>
              <input
                onChange={(e) => setCity(e.target.value)}
                value={city}
                type="text"
                placeholder="City"
                required
                className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:border-[#0f172a] focus:outline-none transition"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <p className="text-gray-700 font-medium mb-1">Address</p>
            <input
              onChange={(e) => setAddress1(e.target.value)}
              value={address1}
              type="text"
              placeholder="Address line 1"
              required
              className="mb-2 input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:border-[#0f172a] focus:outline-none transition"
            />
            <input
              onChange={(e) => setAddress2(e.target.value)}
              value={address2}
              type="text"
              placeholder="Address line 2"
              required
              className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:border-[#0f172a] focus:outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* About Doctor */}
      <div>
        <p className="text-gray-700 font-medium mb-1">About Doctor</p>
        <textarea
          onChange={(e) => setAbout(e.target.value)}
          value={about}
          placeholder="Write about doctor"
          rows={5}
          required
          className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:border-[#0f172a] focus:outline-none transition resize-none"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        style={{ backgroundColor: "#0f172a" }}
        className="mt-4 text-white font-semibold py-3 rounded-lg shadow-md transition w-full hover:brightness-110 cursor-pointer"
      >
        Add Doctor
      </button>
    </form>
  );
};

export default AddDoctor;
