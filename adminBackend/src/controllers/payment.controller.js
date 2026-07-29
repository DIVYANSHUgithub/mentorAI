import Course from "../models/course.model.js"
import razorpay from "../config/razorpay.js";

import crypto from "crypto"
import Payment from "../models/payment.model.js";
import UserModel from "../models/user.js";
import Enrollment from "../models/enrollment.model.js";

export const paymentController=async (req, res)=>{
    try{
        const { courseId } = req.body;
        console.log(courseId);
        const course=await Course.findById(courseId).lean()
         if(!course){
            return res.status(404).json({
                success: false,
                message: "course does not exist"
            })
        }
        const courseprice=course.price
        const options={
            amount:courseprice*100,
            currency:"INR",
            receipt:`c_${courseId}`
        }
        const order=await razorpay.orders.create(options)
        console.log(order);
        res.status(200).json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            key: process.env.RAZORPAY_KEY_ID,
        })
    }catch (err) {
        console.error("Payment Error:", err);

        return res.status(500).json({
            success: false,
            message: err.message,
            error: err
        });
    }
};

export const verifyPayment = async (req, res) => {
    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            courseId,
        } = req.body;
        const userId=req.user._id
        console.log(userId)
        const body = `${razorpay_order_id}|${razorpay_payment_id}`;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");
        const isAuthentic = expectedSignature === razorpay_signature;
        if (!isAuthentic) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature"
            });
        }
        const course=await Course.findById(courseId)
        if (!course) {
        return res.status(404).json({
            success: false,
            message: "Course not found"
        });
}
        const existingPayment = await Payment.findOne({
            razorpay_payment_id
        });
        if(existingPayment)
        {
            return res.status(400).json({
                status:false,
                message:"payment already recorded"
            })
        }
        const payment = await Payment.create({
            userId,
            courseId,
            razorpay_order_id,
            razorpay_payment_id,
            amount: course.price,
            currency: course.currency,
            status: "success",
            paidAt: new Date()
        });
        const existingEnrollment = await Enrollment.findOne({
            userId,
            courseId
        });
        if(existingEnrollment)
        {
            return res.status(200).json({
                status:true,
                message:"User Already Enrolled",
            })
        }
        const enrollment = await Enrollment.create({
            userId,
            courseId,
            paymentStatus: "PAID"
        });
        return res.status(200).json({
            success: true,
            message: "Payment verified and enrollment created successfully",
            enrollment
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

