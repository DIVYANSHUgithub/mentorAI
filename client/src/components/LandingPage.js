import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Signup from './signup';
import { useNavigate } from 'react-router-dom';
import { 
  FaPlay, 
  FaComments, 
  FaBrain, 
  FaGraduationCap, 
  FaArrowRight,
  FaStar,
  FaVideo,
  Fa
} from 'react-icons/fa';
import Login from './login';



function LandingPage() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const features = [
    {
      icon: <FaVideo className="text-3xl text-blue-500" />,
      title: "Interactive Video Learning",
      description: "Watch educational videos with real-time AI assistance and interactive features."
    },
    {
      icon: <FaComments className="text-3xl text-green-500" />,
      title: "Real-time AI Chat",
      description: "Get instant answers and explanations while watching videos through our intelligent AI assistant."
    },
    {
      icon: <FaBrain className="text-3xl text-purple-500" />,
      title: "Smart Learning Analytics",
      description: "Track your progress and get personalized recommendations based on your learning patterns."
    },
    {
      icon: <FaGraduationCap className="text-3xl text-orange-500" />,
      title: "Expert Content",
      description: "Access curated educational content from industry experts and top educators."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Computer Science Student",
      content: "The real-time AI chat feature helped me understand complex programming concepts instantly!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Software Engineer",
      content: "Perfect for learning new technologies while working. The video integration is seamless.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Data Scientist",
      content: "The AI assistant is incredibly helpful. It's like having a personal tutor available 24/7.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <FaBrain className="text-2xl text-blue-600" />
              <span className="text-xl font-bold text-gray-900">EDUAI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How it Works</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Testimonials</a>
              <button 
                onClick={() => navigate('/login')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Learn with
                <span className="text-blue-600 block">AI-Powered</span>
                Video Education
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Transform your learning experience with interactive videos and real-time AI assistance. 
                Get instant answers, explanations, and personalized guidance while watching educational content.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/login')}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <FaPlay />
                  <span>Start Learning</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Watch Demo</span>
                  <FaArrowRight />
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                {/* Real Video Section */}
                <div className="bg-gray-900 rounded-lg aspect-video mb-4 overflow-hidden">
                <video
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                    poster="presentation.png"
                  >
                    <source src="/presentation-app.mp4" type="video/mp4" />
                    
              
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                {/* Video Title and Description */}
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Introduction to AI-Powered Learning</h3>
                  <p className="text-sm text-gray-600 mb-3">Learn how our AI assistant helps you understand complex topics in real-time</p>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <FaBrain className="text-white text-sm" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                </div>
                
                {/* AI Assistant Status */}
                <button className="bg-blue-50 rounded-lg p-4" >
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <FaComments className="text-blue-600" />
                      <span className="text-blue-600 font-medium">AI Assistant Active</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-sm text-blue-600 mt-1">Ready to answer your questions</p>
                  </div>
                </button>
                
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose AI Tech Educator?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of education with our cutting-edge AI-powered learning platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Choose Your Video",
                description: "Browse our extensive library of educational videos across various tech topics."
              },
              {
                step: "2",
                title: "Watch & Learn",
                description: "Start watching and engage with the content. Our AI tracks your progress in real-time."
              },
              {
                step: "3",
                title: "Ask & Get Answers",
                description: "Use the AI chat to ask questions anytime. Get instant, contextual responses."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Educational Videos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our curated collection of high-quality educational content with AI-powered assistance
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Main Featured Video */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="aspect-video bg-gray-900">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU"
                    title="Machine Learning Fundamentals"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Machine Learning Fundamentals</h3>
                  <p className="text-gray-600 mb-4">Learn the basics of machine learning with our AI assistant providing real-time explanations and examples.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Duration: 45 min</span>
                    <span className="text-sm text-blue-600 font-medium">AI Assisted</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Video List */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                {
                  title: "React.js Complete Guide",
                  description: "Master React.js from basics to advanced concepts",
                  duration: "2h 15min",
                  thumbnail: "https://img.youtube.com/vi/Ke90Tje7VS0/maxresdefault.jpg"
                },
                {
                  title: "Python for Data Science",
                  description: "Learn Python programming for data analysis and visualization",
                  duration: "1h 45min",
                  thumbnail: "https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg"
                },
                {
                  title: "Web Development Bootcamp",
                  description: "Complete web development course with modern technologies",
                  duration: "3h 30min",
                  thumbnail: "https://img.youtube.com/vi/916GWv2Qs08/maxresdefault.jpg"
                }
              ].map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <div className="flex space-x-4">
                    <div className="w-24 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center" style={{display: 'none'}}>
                        <FaVideo className="text-gray-500" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{video.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{video.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{video.duration}</span>
                        <span className="text-xs text-blue-600 font-medium">AI Ready</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of learners who have transformed their education
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are already experiencing the future of education with AI-powered video learning.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSignup(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Your Free Trial
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FaBrain className="text-2xl text-blue-400" />
                <span className="text-xl font-bold">AI Tech Educator</span>
              </div>
              <p className="text-gray-400">
                Transforming education through AI-powered video learning and real-time assistance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#tutorials" className="hover:text-white transition-colors">Tutorials</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#help" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#privacy" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AI Tech Educator. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {/* Login Modal */}
      

      {/* Login Modal */}
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {/* Signup Modal */}
      {showSignup && (
        <Signup
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
}

export default LandingPage; 