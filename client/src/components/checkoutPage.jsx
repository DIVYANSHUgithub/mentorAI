import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  Check,
  Lock,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Landmark,
  Star,
  MessageCircle,
} from "lucide-react";
import { Await, Navigate, useParams } from "react-router-dom";
import axios from "axios";

/**
 * EduAI Checkout Page
 * Pixel-faithful rebuild of the supplied screenshot.
 * Stack: React + Tailwind CSS
 */

const steps = [
  { id: 1, label: "Order Details" },
  { id: 2, label: "Payment" },
  { id: 3, label: "Confirmation" },
];

const paymentMethods = [
  {
    id: "upi",
    title: "UPI",
    badge: "Recommended",
    description: "Pay using any UPI app like Google Pay, PhonePe, Paytm or any other UPI app",
    icon: (
      <span className="text-[15px] font-extrabold tracking-tight text-indigo-600">
        UPI<span className="text-orange-500">●</span>
      </span>
    ),
  },
  
];

const includes = [
  "12 hours on-demand video",
  "65 downloadable resources",
  "Full lifetime access",
  "Access on mobile and TV",
  "Certificate of completion",
  "AI Tutor & Doubt Solving",
  "Priority Support",
];

const trustBadges = [
  { icon: <ShieldCheck className="h-4 w-4 text-slate-400" />, title: "Secure Payment", subtitle: "100% safe & secure" },
  { icon: <RotateCcw className="h-4 w-4 text-slate-400" />, title: "Money Back Guarantee", subtitle: "7 days refund policy" },
  { icon: <Headphones className="h-4 w-4 text-slate-400" />, title: "24/7 Support", subtitle: "We're here to help" },
];

function CheckoutPage() {
  const {userId, id}=useParams()
  const courseId=id;
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [coupon, setCoupon] = useState("");
  const [course, setCourse]=useState();
  const fetchCourse=async ()=>{
    const response=await axios.get(`http://localhost:9000/courses/${courseId}`);
    setCourse(response.data)

  }
  useEffect(()=>{
    fetchCourse();
  },[courseId])
  const handleProceedToPayment=async ()=>{
    try{
      const proceedPayment=await axios.post(`http://localhost:9000/payments/create-order`,{
        courseId
      })
      const {orderId, amount, currency, key}=proceedPayment.data
      const options={
        key,
        amount,
        currency,
        order_id:orderId,
        name:"eduai",
        description:"course purchase",
        handler : async function (response) {
          const verifyResponse = await axios.post(
          "http://localhost:9000/payments/verify",
          {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId,
              userId
          }
        )
        console.log(verifyResponse.data)
      },

        modal: {
            ondismiss: function () {
                console.log("Checkout Closed");
            }
        },

        prefill: {
            name: "Divyanshu Mishra",
            email: "test@example.com",
            contact: "9454528806"
        }

      }
      console.log("options are : ", options)
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        console.log("Payment Failed");
        console.log(response);
      });
      rzp.open();
    }
    catch(err){
      console.error(err);
    }

    
  }
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 font-sans text-slate-900 sm:px-8 lg:px-16">
      {/* Back link */}
      <button className="mb-6 flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700">
        <ChevronLeft className="h-4 w-4" />
        Back to Course
      </button>

      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Checkout</h1>
        <p className="mt-1 text-sm text-slate-500">Complete your purchase to start learning</p>
      </div>

      {/* Stepper */}
      <div className="mb-8 flex items-center justify-center gap-3">
        {steps.map((step, idx) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                  step.id === 1
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                {step.id}
              </div>
              <span
                className={`text-xs ${
                  step.id === 1 ? "font-medium text-slate-700" : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className="mb-5 h-px w-16 bg-slate-200 sm:w-24" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Main grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Payment method card */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-[15px] font-semibold text-slate-900">
              Select Payment Method
            </h2>

            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const isSelected = selectedMethod === method.id;
                return (
                  <label
                    key={method.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-50/60"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment-method"
                      className="mt-1 h-4 w-4 accent-indigo-600"
                      checked={isSelected}
                      onChange={() => setSelectedMethod(method.id)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-800">
                          {method.title}
                        </span>
                        {method.badge && (
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">
                            {method.badge}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">
                        {method.description}
                      </p>
                    </div>
                    <div className="mt-1 flex shrink-0 items-center">{method.icon}</div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Coupon card */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-[15px] font-semibold text-slate-900">Apply Coupon</h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon code"
                className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
              <button className="rounded-lg border border-indigo-500 px-6 py-2.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50">
                Apply
              </button>
            </div>
          </div>

          {/* Trust badges row */}
          <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            {trustBadges.map((badge) => (
              <div key={badge.title} className="flex items-center gap-2">
                {badge.icon}
                <div>
                  <p className="text-xs font-medium text-slate-700">{badge.title}</p>
                  <p className="text-[11px] text-slate-400">{badge.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Proceed button */}
          <div>
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700" onClick={(handleProceedToPayment)}>
              <Lock className="h-4 w-4" />
              Proceed to Payment
            </button>
            <p className="mt-2 text-center text-xs text-slate-400">
              You won't be charged until you review this order on the next step.
            </p>
          </div>

          {/* Trusted by */}
          <div className="pt-2 text-center">
            <p className="mb-4 text-xs text-slate-400">Trusted by 1M+ learners</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale">
              <span className="text-lg font-semibold text-slate-500">Google</span>
              <span className="text-lg font-semibold text-slate-500">Microsoft</span>
              <span className="text-lg font-semibold text-slate-500">amazon</span>
              <span className="text-lg font-semibold text-slate-500">coursera</span>
              <span className="text-lg font-semibold text-slate-500">edX</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Order summary */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-[15px] font-semibold text-slate-900">Order Summary</h2>

            <div className="flex gap-3">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-indigo-900 to-slate-900">
                <div className="flex h-full w-full items-center justify-center text-2xl">
                  🐍
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight text-slate-900">
                  Python for Data Science
                </p>
                <p className="mt-1 text-xs text-slate-500">By Dr. Alex Morgan</p>
                <div className="mt-1 flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium text-slate-700">4.8</span>
                  <span className="text-xs text-slate-400">(12,450)</span>
                </div>
              </div>
            </div>

            <div className="my-4 border-t border-slate-100" />

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Original Price</span>
                <span className="text-slate-500 line-through">₹999</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Discount (50%)</span>
                <span className="text-green-600">- ₹500</span>
              </div>
            </div>

            <div className="my-4 border-t border-slate-100" />

            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Total Price</span>
              <span className="text-lg font-bold text-slate-900">499</span>
            </div>

            <div className="mt-4 rounded-lg bg-green-50 px-4 py-2.5 text-center text-sm font-medium text-green-700">
              🎉 You Save ₹500 (50% OFF)
            </div>

            <div className="my-5 border-t border-slate-100" />

            <p className="mb-3 text-sm font-semibold text-slate-900">This course includes:</p>
            <ul className="space-y-2.5">
              {includes.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                  <Check className="h-4 w-4 shrink-0 text-indigo-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Support card */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Have a question?</p>
            <p className="mt-1 text-xs text-slate-500">
              Our support team is here to help with any queries.
            </p>
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-indigo-500 py-2.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50">
              <MessageCircle className="h-4 w-4" />
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CheckoutPage;