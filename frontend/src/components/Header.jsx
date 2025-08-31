import React from "react";
import { assets } from "../assets/assets";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

const Header = () => {
    return (
        <header className="bg-[#0f172a] rounded-2xl px-6 md:px-12 lg:px-20 py-10 md:py-16 w-full my-6 flex flex-col-reverse md:flex-row items-center gap-10 shadow-lg overflow-hidden">
            {/* Left Section */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex-1 flex flex-col justify-center gap-6 text-center md:text-left"
            >
            
                {/* Heading with Typing Effect */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight"
                >
                    <span className="bg-gradient-to-r from-[#06b6d4] to-[#0ea5e9] text-transparent bg-clip-text">
                        Connect with{" "}
                    </span>
                    <span className="text-[#f1f5f9]">
                        <Typewriter
                            words={[
                                "Trusted Doctors Near You",
                                "Top Specialists Around You",
                                "Experienced Medical Experts",
                            ]}
                            loop={true}
                            cursor
                            cursorStyle="|"
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1500}
                        />
                    </span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="text-[#f1f5f9]/80 text-base sm:text-lg font-light max-w-lg mx-auto md:mx-0"
                >
                    Discover top specialists and schedule your appointment in just a few clicks.
                    Your health, our priority.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center gap-5 justify-center md:justify-start mt-4"
                >
                    {/* Book Appointment Button */}
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="#speciality"
                        className="flex items-center gap-2 bg-[#0ea5e9] hover:bg-[#0284c7] transition-all duration-300 px-6 py-3 rounded-full text-white text-base font-semibold shadow-md w-full sm:w-auto justify-center"
                    >
                        Book Appointment
                        <img className="w-4" src={assets.arrow_icon} alt="arrow" />
                    </motion.a>

                    {/* Trust Section */}
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
                </motion.div>
            </motion.div>

            {/* Right Section (Floating Image) */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex-1 flex justify-center md:justify-end relative"
            >
                <motion.img
                    src={assets.header_img}
                    alt="Doctor Consultation"
                    className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-2xl shadow-2xl object-cover"
                    animate={{ y: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                />
            </motion.div>
        </header>
    );
};

export default Header;
