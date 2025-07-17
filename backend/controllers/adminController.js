import validator from "validator";
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

// API to add doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, experience, degree, about, fees, address, available } = req.body;
        const imageFile = req.file;

        // Check for all required fields
        if (!name || !email || !password || !speciality || !experience || !degree || !about || !fees || !address || available === undefined) {
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
        const {email,password} = req.body;
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){

            const token = jwt.sign(email+password,process.env.JWT_SECRET)            
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid credentials"})
        }
        
    } catch (error) {
        res.json({success:false,message:"Error in admin login",error:error.message})
    }
}

export { addDoctor,adminLogin };
