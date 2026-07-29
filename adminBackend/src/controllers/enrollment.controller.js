import Enrollment from "../models/enrollment.model.js";

export const enrollment=async (req, res)=>{
    try{
        const {courseId}=req.params;
        const userId=req.user._id;
        const enrolledStatus= await Enrollment.findOne({
            userId,
            courseId,
        });
        
        return res.status(200).json({
            success: true,
            isEnrolled: !!enrolledStatus
        });
    }catch(err){
        console.log("error : ", err);
        return res.status(400).json({
            success:false,
            message: err.message
        })
    }
}