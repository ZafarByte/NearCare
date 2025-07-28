import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'

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


const loginUser = async(req,res)=>{
    try {
        const {email,password}=req.body
        const user = await userModel.findOne({email})

        if(!user){
            res.json({success:false,message:'User does not exist'})
        }

        const isMatch= await bcrypt.compare(password,user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid Credential"})
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
  

export {registerUser,loginUser ,getProfile,updateProfile}