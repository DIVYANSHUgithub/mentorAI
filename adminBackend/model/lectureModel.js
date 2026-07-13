import mongoose from "mongoose"
const Lecture=new mongoose.Schema({
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
        type:Number,
        default:0,
    },
    isPreview:{
        type:Boolean,
        default:false,
    },
    order:{
        type:Number,
        default:1,
    },

});