import mongoose from 'mongoose';

const Course = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim:true,
    },
    subtitle:{
        type:String,
        trim:true,
    },
    category:{
        type:String,
        required:true,
        trim:true,
    },
    subcategory:{
        type:String,
        required:true,
    },
    instructor:{
        type:String,
        required: true,
        
    },
    language:{
        type:String,
        required: true,
    },
    level:{
        type:String,
        enum:[
            "Beginner",
            "Intermediate",
            "Advanced",
            "All Levels"
        ],
        required: true,
    },
    shortDescription:{
        type:String,
        required: true,
        trim:true,
    },
    fullDescription:{
        type:String,
        required: true,
        trim:true,
    },
    thumbnailUrl:{
        type:String,
        required: true,
    },
    price:{
        type:Number,
        required: true,
    },
    originalPrice:{
        type:Number,
        required: true,
    },
    currency:{
        type:String,
        default:"INR"
    },
    status:{
        type:String,
        enum:["draft","published"],
        default:"draft"
    },
},{
    timestamps:true
});

const Section = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    title:{
        type:String,
        required: true,
        trim:true,
    },
    description:{
        type:String,
        trim:true,
    },
    order:{
        type:Number,
    },
});

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

const enrollment = new mongoose.Schema({
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    paymentStatus:{
        type:String,
        enum:[
            "FREE",
            "PAID",
            "PENDING",
            "FAILED"
        ],
        default:"FREE"
    },
    
},{
    timestamps:true
});
Course.index({
    category:1
});
Enrollment.index(
    {
        studentId:1,
        courseId:1
    },
    {
        unique:true
});
Lecture.index({
    sectionId:1
});
Section.index({
    courseId:1
});