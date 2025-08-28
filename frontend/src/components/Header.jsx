import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
    return (
        <header className="bg-[#0f172a] rounded-2xl px-6 md:px-12 lg:px-20 py-10 md:py-16 w-full my-6 flex flex-col-reverse md:flex-row items-center md:items-center gap-10 shadow-lg">
            {/* Left Section */}
            <div className="flex-1 flex flex-col justify-center gap-6 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#06b6d4] leading-tight tracking-tight">
                    Connect with <br className="hidden md:block" />
                    <span className="text-[#f1f5f9]">Trusted Doctors Near You</span>
                </h1>


                <p className="text-[#f1f5f9]/80 text-base sm:text-lg font-light max-w-lg mx-auto md:mx-0">
                    Discover top specialists and schedule your appointment in just a few clicks.
                    Your health, our priority.
                </p>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-center gap-5 justify-center md:justify-start mt-4">
                    <a
                        href="#speciality"
                        className="flex items-center gap-2 bg-[#0ea5e9] hover:bg-[#0284c7] transition-all duration-300 px-6 py-3 rounded-full text-white text-base font-semibold shadow-md w-full sm:w-auto justify-center"
                    >
                        Book Appointment
                        <img className="w-4" src={assets.arrow_icon} alt="arrow" />
                    </a>

                    <div className="flex items-center gap-3">
                        <img
                            className="w-16 sm:w-20 rounded-full border-4 border-[#06b6d4] shadow-md"
                            src={assets.group_profiles}
                            alt="Group Profiles"
                        />
                        <p className="text-sm text-[#f1f5f9]/70 font-medium leading-snug">
                            1000+ patients trust <br /> our verified doctors
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex-1 flex justify-center md:justify-end relative">
                <img
                    className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-2xl shadow-2xl object-cover"
                    src={assets.header_img}
                    alt="Doctor Consultation"
                />
            </div>
        </header>
    );
};

export default Header;
