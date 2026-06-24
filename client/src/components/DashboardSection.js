import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaBook,
  FaCheckCircle,
  FaClock,
  FaFire,
  FaRocket,
  FaChevronRight,
  FaStar
} from 'react-icons/fa';

// Shared courses data - matches OfferedCourses
const AVAILABLE_COURSES = [
  {
    id: 1,
    title: 'Maths for Machine Learning',
    instructor: 'Dr. Ashish Agrawal',
    level: 'All Levels',
    duration: '8 weeks',
    category: 'AI & ML',
    price: '₹5999',
    rating: 4.8,
  },
  {
    id: 2,
    title: 'React.js Complete Guide',
    instructor: 'Anurag Singh',
    level: 'Intermediate',
    duration: '6 weeks',
    category: 'Web Development',
    price: '₹1999',
    rating: 4.9,
  },
  {
    id: 3,
    title: 'Python for Data Science',
    instructor: 'Emily Rodriguez',
    level: 'Beginner',
    duration: '10 weeks',
    category: 'Data Science',
    price: '₹2999',
    rating: 4.7,
  },
  {
    id: 4,
    title: 'Advanced JavaScript Concepts',
    instructor: 'Hitesh Chaudhury',
    level: 'Advanced',
    duration: '4 weeks',
    category: 'Programming',
    price: '₹3999',
    rating: 4.6,
  },
];

function DashboardSection({ user, stats, recentActivities, searchQuery }) {
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const handleViewAll = () => {
    navigate('/courses');
  };

  // Use available courses instead of the passed courses prop
  const featuredCourses = AVAILABLE_COURSES.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user}! 👋
            </h1>
            <p className="text-blue-100 dark:text-blue-200">
              Continue your learning journey with AI-powered education
            </p>
          </div>
          <div className="hidden md:block">
            <FaRocket className="text-6xl text-blue-200 dark:text-blue-300" />
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Courses', value: stats.totalCourses, icon: FaBook, color: 'blue' },
          { label: 'Completed Lessons', value: stats.completedLessons, icon: FaCheckCircle, color: 'green' },
          { label: 'Learning Hours', value: stats.totalHours, icon: FaClock, color: 'purple' },
          { label: 'Current Streak', value: `${stats.currentStreak} days`, icon: FaFire, color: 'orange' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`text-xl text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Featured Courses */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Courses</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Explore our top-rated courses designed by eduAI experts
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewAll}
            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium flex items-center space-x-1"
          >
            <span>View All</span>
            <FaChevronRight className="text-sm" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="flex flex-col justify-between rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer group"
              onClick={() => handleCourseClick(course.id)}
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-200 px-3 py-1 text-xs font-semibold">
                    {course.category}
                  </span>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-300">
                    {course.level}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  By {course.instructor}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <span>{course.duration}</span>
                  <span className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    {course.rating}
                  </span>
                </div>
              </div>

              <div className="px-5 pb-5 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Price</p>
                    <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                      {course.price}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCourseClick(course.id);
                    }}
                    className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:shadow-md hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {featuredCourses.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400">No courses found matching your search.</p>
          </div>
        )}
      </div>

      {/* Recent Activities */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <FaCheckCircle className="text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{activity.course}</p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardSection; 