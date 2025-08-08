import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'
import nodemailer from 'nodemailer';
import otpStore from '../otpStore.js'

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const htmlTemplatePath = path.join(__dirname, '..', 'templates', 'otpEmail.html');
const htmlContent = fs.readFileSync(htmlTemplatePath, 'utf-8');

// api for registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;


    if (!name || !password || !email) {
      return res.status(400).json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Enter a valid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    });

    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    res.status(201).json({ success: true, token });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })

    if (!user) {
      res.json({ success: false, message: 'User does not exist' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: "Invalid Credential" })
    }

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}
//Api to get user data
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ get from token (secure)

    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    const updatedFields = {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender
    };

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: 'image'
      });
      updatedFields.image = imageUpload.secure_url;
    }

    await userModel.findByIdAndUpdate(userId, updatedFields);

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



const bookAppointment = async (req, res) => {

  try {
    const { docId, slotDate, slotTime } = req.body;
    const userId = req.user.id; // pulled from JWT, safer

    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not Available" });
    }

    let slots_Booked = docData.slots_Booked
    //checking for availability
    if (slots_Booked[slotDate]) {
      if (slots_Booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not Available" });
      }
      else {
        slots_Booked[slotDate].push(slotTime);
      }
    }
    else {
      slots_Booked[slotDate] = []
      slots_Booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select('-password');
    delete docData.slots_Booked

    const appointmentData = {
      userId, docId, userData, docData, amount: docData.fees, slotTime, slotDate, date: Date.now()
    }

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    //save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId, { slots_Booked });

    res.json({ success: true, message: "Appointment Booked" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });

  }
}


//
const listAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const appointments = await appointmentModel.find({ userId })
    res.json({ success: true, appointments })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//api to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId)

    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "unauthorized action" })
    }
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

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)
    if (!appointmentData || appointmentData.cancelled) {
      return res.json({ success: false, message: "Appointment Cancelled or not found" });
    }

    //option for razorpay payment

    const options = {
      amount: appointmentData.amount * 100, // amount in the smallest currency unit
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };

    //creation of an order
    const order = await razorpayInstance.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//api to verifypayment 
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    if (orderInfo.status == 'paid') {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { Payment: true })
      res.json({ success: true, message: "Payment Successful" })
    }
    else {
      res.json({ success: false, message: "Payment Failed" })
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}


const sendOtp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 mins

  otpStore.set(email, { otp, expiresAt, name, password });

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Your OTP for Registration',
      html: htmlContent.replace('{{OTP}}', otp), // if your HTML has {{OTP}} placeholder
    });

    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (err) {
    console.error('Email error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
}


export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay, sendOtp }