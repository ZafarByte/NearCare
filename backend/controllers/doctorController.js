import doctorModel from "../models/doctorModel.js"


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

export {changeAvailability,doctorList}