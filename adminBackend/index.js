import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import multer from 'multer';


// AWS S3
// commands used for operations in aws s3
// putobjectcommand - to upload an object to s3
// getobjectcommand - to get an object from s3
// deleteobjectcommand - to delete an object from s3
// listobjectscommand - to list objects in a bucket
// listbucketscommand - to list buckets
// createbucketcommand - to create a bucket
// deletebucketcommand - to delete a bucket
// getbucketlocationcommand - to get the location of a bucket
// getbucketaclcommand - to get the acl of a bucket
// getbucketloggingcommand - to get the logging of a bucket


// install 
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import Course from './model/courseModel.js';
import Section from './model/sectionModel.js';
import axios from 'axios';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// -------------------------
// MongoDB connection
// -------------------------

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
  });

// -------------------------
// AWS S3 client
// -------------------------

const s3 = new S3Client({
  region: process.env.AWS_REGION,

  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// -------------------------
// Multer memory storage
// -------------------------

// multer is used to store the file in memory
// which memory us used in multer.memoryStorage() where actually data is stored in multer
// multer stores the memory in the temporary memory of the server where server stores the data in storage of the machine's Ram

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, callback) => {
    if (!file.mimetype.startsWith('image/')) {
      return callback(
        new Error('Only image files are allowed')
      );
    }

    callback(null, true);
  },
});

// -------------------------
// Create course
// -------------------------

app.post(
  '/courses',
  upload.single('thumbnail'),
  async (req, res) => {
    try {
      console.log('Text fields:', req.body);
      console.log('Thumbnail:', req.file);

      if (!req.file) {
        return res.status(400).json({
          message: 'Thumbnail image is required',
        });
      }

      // Generate unique S3 object key
      const fileKey =
        `course-thumbnails/${Date.now()}-${req.file.originalname}`;

      // Upload image to AWS S3
      const uploadCommand = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileKey,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      });

      await s3.send(uploadCommand);

      // Build URL
    //   const thumbnailUrl =
    //     `https://${process.env.AWS_S3_BUCKET_NAME}` +
    //     `.s3.${process.env.AWS_REGION}` +
    //     `.amazonaws.com/${fileKey}`;

      // Parse included array
      let included = [];

      if (req.body.included) {
        included = JSON.parse(req.body.included);
      }

      // Create MongoDB document
      const course = await Course.create({
        title: req.body.title,
        subtitle: req.body.subtitle,
        category: req.body.category,
        subcategory: req.body.subcategory,
        instructor: req.body.instructor,
        language: req.body.language,
        level: req.body.level,
        shortDescription: req.body.shortDescription,
        fullDescription: req.body.fullDescription,

        // AWS URL instead of actual image
        // thumbnailUrl,
        thumbnailKey:fileKey,

        // Included array
        included,
        publishDate: req.body.publishDate,
        status: req.body.status ||'draft',
      });

      return res.status(201).json({
        success: true,
        message: 'Course created successfully',
        course,
        courseId: course._id,
      });
    } catch (error) {
      console.error('Create course error:', error);

      return res.status(500).json({
        success: false,
        message: 'Failed to create course',
        error: error.message,
      });
    }
  }
);

app.post('/courses/:courseId/sections', async(req, res)=>{
    try{
        const createSection=await Section.create({
          
          courseId:req.params.courseId,
          title:req.body.title,
          description: req.body.description,
        })
        const course = await Course.findById(req.params.courseId).lean();

        const sections = await Section.find({
          courseId: req.params.courseId
        }).lean();
        return res.status(201).json({
            success:true,
            message:'Section created successfully',
            course: {
              ...course,
              sections
            }
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:'Failed to create section',
            error:error.message
        })
    }
})


//-------------------------
// Delete Courses
//-------------------------
app.delete('/courses/:courseId', async(req, res)=>{
  const course=await Course.findById(req.params.courseId).lean();
  if(!course){
    return res.status(404).json({
      message:"course not found"
    })
  }
  await Course.findByIdAndDelete(req.params.courseId);
  await Section.deleteMany({
    courseId:req.params.courseId
  })
  const updatedCourse=await Course.find().lean();
  res.send({
    message:"course deleted successfully",
    course:updatedCourse
  })


})
// -------------------------
// Get courses
// -------------------------

app.get('/courses', async (req, res) => {
    try {
      // 1. Fetch courses from MongoDB
      const courses = await Course.find()
        .sort({ createdAt: -1 })
        .lean();
        
      // 2. Generate temporary signed URL for each thumbnail
      const coursesWithThumbnailUrls = await Promise.all(
        courses.map(async (course) => {
          const command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: course.thumbnailKey,
          });
  
          const thumbnailUrl = await getSignedUrl(
            s3,
            command,
            {
              expiresIn: 60 * 60,
            }
          );
  
          return {
            ...course,
            thumbnailUrl,
          };
        })
      );
  
      // 3. Send courses to frontend
      return res.status(200).json({
        success: true,
        count: coursesWithThumbnailUrls.length,

        
        courses: coursesWithThumbnailUrls,
      });
    } catch (error) {
      console.error('Get courses error:', error);
  
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch courses',
        error: error.message,
      });
    }
  });


// -------------------------
// get course among all courses by courseId
// -------------------------

app.get("/courses/:courseId",async(req,res)=>{

  const {courseId}=req.params;
  const course=await Course.findById(courseId).lean();
  console.log("Course ID received:", courseId);
  
  await Course.findById(courseId).lean();
  console.log("Course fetched:", course);
  const sections = await Section.find({
      courseId: courseId,
      course
    }).lean();

  if(!course)
    return res.status(404).json({
    message:"Course not found"
  });

  

  res.send({
    course: {
      ...course,
      sections
    }
  });
});
// -------------------------
// delete the section from course
// -------------------------
app.delete(`/courses/:courseId/sections/:sectionId`, async(req, res)=>{
  const course= await Course.findById(req.params.courseId).lean();
  if(!course)
  {
    return res.status(404).json({
      message:"Course not found",

    })
  }
  const sections=await Section.find({
    courseId: req.params.courseId
  }).lean();
  if(!sections){
    return res.status(404).json({
      message:"section not found",
    })
  }

  await Section.findByIdAndDelete(req.params.sectionId);
  const updatedSections=await Section.find({
    courseId: req.params.courseId
  }).lean();
  res.send({
    course:{
      ...course,
      sections:updatedSections
    }
  })
  

})

// -------------------------
// handle price saving
// -------------------------
app.post(`/courses/:courseId/price`, async(req, res)=>{
  const course= await Course.findById(req.params.courseId).lean();
  if(!course)
  {
    return res.status(404).json({
      message:"Course not found",
    })
  }

  const updatedCourse=await Course.findByIdAndUpdate(req.params.courseId,{
    price:req.body.price,
    originalPrice: req.body.originalPrice,
    isFree:req.body.isFree
  },{returnDocument:'after'}).lean();
  res.send({
    course:updatedCourse
  })
})

//-------------------------
// handle publish course
//-------------------------
app.post(`/courses/:courseId/publish`, async(req, res)=>{
  const course=await Course.findById(req.params.courseId).lean();
  if(!course){
    return res.status(404).json({
      message:"course not found"
    })
  }
  const publishedCourse= await Course.findByIdAndUpdate(req.params.courseId,{
    status:'published'
  },{returnDocument:'after'
  }).lean();
  res.send({
    course:publishedCourse
  })

});

// -------------------------
// Start server
// -------------------------

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});