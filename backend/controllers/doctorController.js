import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"

const changeAvailability = async (req,res)=>{
    try{
        const {docId} = req.body
        const docData = await doctorModel.findById(docId)
        
        if (!docData) {
            return res.json({success: false, message: 'Doctor not found'})
        }
        
        await doctorModel.findByIdAndUpdate(docId, {available: !docData.available})

        res.json({success: true, message: 'Availability Changed'})

    }catch(error){
        console.log(error)
        res.json({success: false, message: error.message})

    }

}

const doctorList = async (req,res) =>{
    try {
        console.log('doctorList function called')
        const doctors=await doctorModel.find({}).select(['-password','-email'])
        console.log('Doctors found:', doctors.length)
        res.json({success:true,doctors})
    } catch (error) {
        console.log('Error in doctorList:', error)
        res.json({success:false,message:error.message})
    }
}

const loginDoctor = async(req,res)=>{
    try {
        const{email,password}=req.body
        const doctor = await doctorModel.findOne({email})
        if(!doctor){
            return res.json({success:false,message:'Invalid credentials'})
        }
        const isMatch = await bcrypt.compare(password, doctor.password)
        if(isMatch){
            const token = jwt.sign({id: doctor._id}, process.env.JWT_SECRET)
            return res.json({success: true, token})
        }
        else{
            return res.json({success:false,message:'Invalid credentials'})
        }
        res.json({success:true,doctor})
    } catch (error) {
        console.log('Error in doctorList:', error)
        res.json({success:false,message:error.message})
    }
}

const appointmentsDoctor= async(req,res)=>{
    try {
        
       console.log("Doctor ID from token:", req.doctor.id);  // 👈 log decoded doctor ID from JWT

    const appointments = await appointmentModel.find({ docId: req.doctor.id });

    console.log("Appointments fetched for this doctor:", appointments);

    res.json({ success: true, appointments });

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {changeAvailability,doctorList,loginDoctor,appointmentsDoctor}