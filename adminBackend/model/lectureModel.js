import mongoose from "mongoose"
const lectureModel=new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
        required: true,
    },
    title:{
        type: String,
        required:true,
        trim:true,

    },
    description:{
        type:String,
        trim:true,
    },
    contentType:{
        type:String,
        enum:[
            "video",
            "pdf",
            "ppt",
            "audio",
            "zip"
        ],
        required: true,
    },
    fileUrl:{
        type:String,
    },
    duration:{
        type:String,
        default:0,
    },
    isPreview:{
        type:String,
        default:false,
    },
    order:{
        type:Number,
        default:1,
    },

});

const Lecture=mongoose.model("Lecture", lectureModel);
export default Lecture;