import React from 'react';
import { motion } from 'framer-motion';
import PageBackNav from './PageBackNav';
import { 
  FaBook, 
  FaCheckCircle, 
  FaClock, 
  FaFire, 
  FaTrophy, 
  FaVideo,
  FaGraduationCap,
  FaCode,
  FaDatabase,
  FaRobot,
  FaUsers
} from 'react-icons/fa';

function ProgressSection({ stats, courses, recentActivities, showDashboardBack }) {
  return (
    <div className="space-y-6">
      {showDashboardBack && (
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
          <PageBackNav />
        </div>
      )}
      {/* Progress Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Your Learning Progress 📈
            </h1>
            <p className="text-green-100 dark:text-green-200">
              Track your achievements and continue your learning journey
            </p>
          </div>
          <div className="hidden md:block">
            <FaTrophy className="text-6xl text-green-200 dark:text-green-300" />
          </div>
        </div>
      </motion.div>

      {/* Progress Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            label: 'Total Courses Enrolled', 
            value: stats.totalCourses, 
            icon: FaBook, 
            color: 'blue',
            progress: 75,
            subtitle: '12 active courses'
          },
          { 
            label: 'Lessons Completed', 
            value: stats.completedLessons, 
            icon: FaCheckCircle, 
            color: 'green',
            progress: 60,
            subtitle: '23 lessons this month'
          },
          { 
            label: 'Learning Hours', 
            value: stats.totalHours, 
            icon: FaClock, 
            color: 'purple',
            progress: 85,
            subtitle: '5.2 hours this week'
          },
          { 
            label: 'Current Streak', 
            value: `${stats.currentStreak} days`, 
            icon: FaFire, 
            color: 'orange',
            progress: 90,
            subtitle: 'Keep it up!'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`text-xl text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.subtitle}</div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.label}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{stat.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  className={`h-2 rounded-full bg-${stat.color}-500`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Course Progress Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Active Courses */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Active Courses</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">{courses.filter(c => c.progress > 0).length} courses</span>
          </div>
          
          <div className="space-y-4">
            {courses.filter(course => course.progress > 0).map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-100 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-12 h-12 rounded-lg object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center" style={{display: 'none'}}>
                    <FaVideo className="text-gray-500 dark:text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{course.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{course.instructor}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">{course.progress}%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Complete</div>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                    className="h-2 rounded-full bg-blue-500"
                  />
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{course.duration}</span>
                  <span>{course.level}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning Analytics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Learning Analytics</h2>
          
          {/* Weekly Activity */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Weekly Activity</h3>
            <div className="flex items-end space-x-2 h-24">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                const height = [60, 80, 45, 90, 70, 85, 65][index];
                return (
                  <motion.div
                    key={day}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                    className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg relative group"
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {height} min
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>

          {/* Skills Progress */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Skills Progress</h3>
            <div className="space-y-3">
              {[
                { skill: 'JavaScript', progress: 85, color: 'yellow' },
                { skill: 'React', progress: 72, color: 'blue' },
                { skill: 'Python', progress: 68, color: 'green' },
                { skill: 'Machine Learning', progress: 45, color: 'purple' }
              ].map((skill, index) => (
                <div key={skill.skill} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{skill.skill}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.progress}%` }}
                        transition={{ delay: index * 0.1 + 0.8, duration: 1 }}
                        className={`h-2 rounded-full bg-${skill.color}-500`}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-900 dark:text-white w-8">{skill.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Achievements Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Achievements & Badges</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">{stats.certificates} certificates earned</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: 'First Course', icon: FaGraduationCap, color: 'blue', earned: true },
            { name: 'Week Warrior', icon: FaFire, color: 'orange', earned: true },
            { name: 'Code Master', icon: FaCode, color: 'green', earned: true },
            { name: 'AI Explorer', icon: FaRobot, color: 'purple', earned: false },
            { name: 'Data Wizard', icon: FaDatabase, color: 'indigo', earned: false },
            { name: 'Community Hero', icon: FaUsers, color: 'pink', earned: false }
          ].map((badge, index) => (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 1 }}
              className={`text-center p-4 rounded-lg border-2 transition-all duration-300 ${
                badge.earned 
                  ? `border-${badge.color}-200 dark:border-${badge.color}-700 bg-${badge.color}-50 dark:bg-${badge.color}-900/20` 
                  : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 opacity-50'
              }`}
            >
              <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                badge.earned ? `bg-${badge.color}-100 dark:bg-${badge.color}-900/30` : 'bg-gray-200 dark:bg-gray-600'
              }`}>
                <badge.icon className={`text-xl ${
                  badge.earned ? `text-${badge.color}-600 dark:text-${badge.color}-400` : 'text-gray-400 dark:text-gray-500'
                }`} />
              </div>
              <div className={`text-xs font-medium ${
                badge.earned ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
              }`}>
                {badge.name}
              </div>
              {badge.earned && (
                <div className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">✓ Earned</div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 1.2 }}
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
      </motion.div>
    </div>
  );
}

export default ProgressSection; 