import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = async () => {
    const doc = doctors.find(doc => doc._id === docId);
    setDocInfo(doc);
  };

  const getAvailableSlot = async () => {
    if (!docInfo) return;

    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date();
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        const slotDate = `${day}-${month}-${year}`;
        const slotTime = formattedTime;

        const isSlotAvailable = !(
          docInfo.slots_booked &&
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
        );

        const isSlotBooked =
          docInfo.slots_Booked &&
          docInfo.slots_Booked[slotDate] &&
          docInfo.slots_Booked[slotDate].includes(slotTime);

        if (!isSlotBooked) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }





        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots(prev => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    try {
      const date = docSlots[slotIndex][0].datetime;
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const slotDate = `${day}-${month}-${year}`;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlot();
  }, [docInfo]);

  if (!docInfo)
    return <div className="text-center py-10 text-gray-600">Loading doctor information...</div>;

  return (
    <div className="px-4 md:px-0">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="sm:w-72 sm:flex-shrink-0">
          <img
            className="bg-[#0f172a] w-full h-full sm:h-80 object-cover rounded-lg"
            src={docInfo.image}
            alt=""
          />
        </div>
        <div className="flex-1 border border-gray-400 rounded-lg p-4 md:p-8 py-4 md:py-7 bg-white mx-0 sm:mx-0 sm:mt-0 relative z-10 sm:h-80">
          <p className="flex items-center gap-2 text-lg md:text-2xl font-medium text-gray-900">
            {docInfo.name}
            <img className="w-4 md:w-5" src={assets.verified_icon} alt="" />
          </p>
          <div className="flex items-center gap-2 text-xs md:text-sm mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>
          <div>
            <p className="flex item-center gap-1 text-sm font-medium text-gray-900">
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className="text-xs md:text-sm text-gray-700 max-w-[700px] mt-1">{docInfo.about}</p>
          </div>
          <p className="text-gray-500 font-medium mt-4 text-sm md:text-base">
            Appointment fee:{" "}
            <span className="text-gray-600">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Booking slots */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray">
        <p className="text-base md:text-lg mb-3">Booking Slots</p>
        <div className="flex gap-2 md:gap-3 items-center w-full overflow-x-scroll mt-2 md:mt-4 pb-2">
          {docSlots.length > 0 &&
            docSlots.map((item, index) => (
              <div
                onClick={item.length > 0 ? () => setSlotIndex(index) : undefined}
                className={`text-center py-3 md:py-4 min-w-14 md:min-w-16 rounded-full cursor-pointer select-none flex-shrink-0 ${slotIndex === index
                    ? "bg-[#0f172a] text-white"
                    : item.length === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "border border-gray-200"
                  }`}
                key={index}
              >
                <p className="text-xs md:text-sm">
                  {item[0]
                    ? daysOfWeek[item[0].datetime.getDay()]
                    : daysOfWeek[(new Date(Date.now() + index * 24 * 60 * 60 * 1000)).getDay()]}
                </p>
                <p className="text-sm md:text-base font-medium">
                  {item[0]
                    ? item[0].datetime.getDate()
                    : new Date(Date.now() + index * 24 * 60 * 60 * 1000).getDate()}
                </p>
                {item.length === 0 && <span className="block text-xs mt-1">No slots</span>}
              </div>
            ))}
        </div>

        <div className="flex items-center gap-2 md:gap-3 w-full overflow-x-scroll mt-3 md:mt-4 pb-2">
          {docSlots.length > 0 &&
            docSlots[slotIndex].map((item, index) => (
              <p
                onClick={() => setSlotTime(item.time)}
                className={`text-xs md:text-sm font-light flex-shrink-0 px-3 md:px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime
                    ? "bg-[#0f172a] text-white"
                    : "text-gray-400 border border-gray-300"
                  }`}
                key={index}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>

        <button
          onClick={bookAppointment}
          className="bg-[#0f172a] text-white text-sm font-light px-10 md:px-14 py-3 rounded-full my-4 md:my-6 w-full sm:w-auto"
        >
          Book an Appointment
        </button>
      </div>

      {/* Related doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;
