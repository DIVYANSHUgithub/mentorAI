import { useParams } from "react-router-dom"
import Course from "../model/courseModel"

const paymentController=async (req, res)=>{
    const courseId=useParams()
    const course=await Course.findById(courseId).lean()
    if(!course){
        return res.status(404).json({
            success: false,
            message: "course does not exist"
        })
    }
    
}