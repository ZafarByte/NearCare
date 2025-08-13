import validator from "validator";
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// API to add doctor
const addDoctor = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);
        const { name, email, password, speciality, experience, degree, about, fees, address, available, city } = req.body;
        const imageFile = req.file;

        // Check for all required fields
        if (!name || !email || !password || !speciality || !experience || !degree || !about || !fees || !address || !city) {
            return res.json({ success: false, message: "Missing details" });
        }


        // Check if image is uploaded
        if (!imageFile) {
            return res.json({ success: false, message: "Profile image is required" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // Parse address JSON
        let parsedAddress;
        try {
            parsedAddress = JSON.parse(address);
        } catch (err) {
            return res.json({ success: false, message: "Invalid address format" });
        }

        // Create doctor object
        const doctorData = {
            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            speciality,
            degree,
            experience,
            about,
            fees,
            available: available === "true" || available === true, // convert to boolean
            address: parsedAddress,
            city,
            date: Date.now(),
        };

        // Save to DB
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({ success: true, message: "Doctor added successfully" });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in adding doctor",
            error: error.message
        });
    }
};

//ADMIN LOGIN
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        res.json({ success: false, message: "Error in admin login", error: error.message })
    }
}


//API to get doctor list 
const AllDoctors = async (req, res,) => {
    try {

        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const appointmentAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api to cancel appointment
const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId)


        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
        //releasing doctor slot
        const { docId, slotDate, slotTime } = appointmentData
        const docterData = await doctorModel.findById(docId)
        let slots_Booked = docterData.slots_Booked

        slots_Booked[slotDate] = slots_Booked[slotDate].filter(e => e !== slotTime)
        await doctorModel.findByIdAndUpdate(docId, { slots_Booked })

        res.json({ success: true, message: "Appointment cancelled" })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        const users = await userModel.find({});
        const appointments = await appointmentModel.find({});

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.slice(0, 5)
        };

        res.json({ success: true, dashData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addDoctor, adminLogin, AllDoctors, appointmentAdmin, appointmentCancel, adminDashboard };
