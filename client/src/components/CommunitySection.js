import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageBackNav from './PageBackNav';
import { 
  FaUsers, 
  FaComments, 
  FaTrophy, 
  FaLightbulb, 
  FaHeart, 
  FaShare, 
  FaBookmark,
  FaSearch,
  FaFilter,
  FaPlus,
  FaUser,
  FaClock,
  FaEye,
  FaReply,
  FaStar,
  FaMedal,
  FaFire,
  FaGraduationCap
} from 'react-icons/fa';

function CommunitySection({ showDashboardBack }) {
  const [activeTab, setActiveTab] = useState('forums');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const forums = [
    {
      id: 1,
      title: "Best practices for React hooks",
      author: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      category: "Programming",
      replies: 24,
      views: 156,
      likes: 18,
      time: "2 hours ago",
      isPinned: true,
      tags: ["React", "JavaScript", "Hooks"]
    },
    {
      id: 2,
      title: "Machine Learning project ideas for beginners",
      author: "Alex Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      category: "AI & ML",
      replies: 31,
      views: 203,
      likes: 25,
      time: "5 hours ago",
      isPinned: false,
      tags: ["Machine Learning", "Python", "Beginner"]
    },
    {
      id: 3,
      title: "How to optimize database queries",
      author: "Maria Garcia",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      category: "Data Science",
      replies: 19,
      views: 98,
      likes: 12,
      time: "1 day ago",
      isPinned: false,
      tags: ["Database", "SQL", "Performance"]
    }
  ];

  const studyGroups = [
    {
      id: 1,
      name: "React Masters",
      members: 45,
      category: "Programming",
      description: "Advanced React development and best practices",
      isActive: true,
      nextSession: "Tomorrow, 2:00 PM"
    },
    {
      id: 2,
      name: "Data Science Beginners",
      members: 32,
      category: "Data Science",
      description: "Learning Python, pandas, and basic ML concepts",
      isActive: true,
      nextSession: "Today, 7:00 PM"
    },
    {
      id: 3,
      name: "AI Ethics Discussion",
      members: 28,
      category: "AI & ML",
      description: "Exploring the ethical implications of AI",
      isActive: false,
      nextSession: "Next week"
    }
  ];

  const challenges = [
    {
      id: 1,
      title: "Build a Todo App",
      description: "Create a full-stack todo application using React and Node.js",
      participants: 156,
      deadline: "3 days left",
      difficulty: "Intermediate",
      prize: "$500",
      isActive: true
    },
    {
      id: 2,
      title: "Data Visualization Challenge",
      description: "Create compelling visualizations using D3.js or Chart.js",
      participants: 89,
      deadline: "1 week left",
      difficulty: "Advanced",
      prize: "$750",
      isActive: true
    },
    {
      id: 3,
      title: "AI Chatbot Competition",
      description: "Build an intelligent chatbot using natural language processing",
      participants: 203,
      deadline: "2 weeks left",
      difficulty: "Expert",
      prize: "$1000",
      isActive: true
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Sarah Chen", points: 2840, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face", badge: "Gold" },
    { rank: 2, name: "Alex Rodriguez", points: 2650, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", badge: "Silver" },
    { rank: 3, name: "Maria Garcia", points: 2480, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", badge: "Bronze" },
    { rank: 4, name: "John Smith", points: 2320, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", badge: "None" },
    { rank: 5, name: "Emma Wilson", points: 2180, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face", badge: "None" }
  ];

  return (
    <div className="space-y-6">
      {showDashboardBack && (
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
          <PageBackNav />
        </div>
      )}
      {/* Community Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-700 dark:to-red-700 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Community Hub 👥
            </h1>
            <p className="text-orange-100 dark:text-orange-200">
              Connect, learn, and grow with fellow learners
            </p>
          </div>
          <div className="hidden md:block">
            <FaUsers className="text-6xl text-orange-200 dark:text-orange-300" />
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-2">
        <div className="flex space-x-2">
          {[
            { id: 'forums', label: 'Forums', icon: FaComments },
            { id: 'groups', label: 'Study Groups', icon: FaUsers },
            { id: 'challenges', label: 'Challenges', icon: FaTrophy },
            { id: 'leaderboard', label: 'Leaderboard', icon: FaMedal }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <tab.icon className="text-sm" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Forums Section */}
      {activeTab === 'forums' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Categories</option>
                <option value="Programming">Programming</option>
                <option value="AI & ML">AI & ML</option>
                <option value="Data Science">Data Science</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <FaPlus className="text-sm" />
                <span>New Post</span>
              </motion.button>
            </div>
          </div>

          {/* Forums List */}
          <div className="space-y-4">
            {forums.map((forum, index) => (
              <motion.div
                key={forum.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={forum.avatar}
                    alt={forum.author}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center" style={{display: 'none'}}>
                    <FaUser className="text-gray-500 dark:text-gray-400" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {forum.isPinned && (
                        <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full text-xs font-medium">
                          Pinned
                        </span>
                      )}
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                        {forum.category}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                      {forum.title}
                    </h3>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span>By {forum.author}</span>
                      <div className="flex items-center space-x-1">
                        <FaClock className="text-xs" />
                        <span>{forum.time}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                        <FaComments className="text-sm" />
                        <span>{forum.replies}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                        <FaEye className="text-sm" />
                        <span>{forum.views}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                        <FaHeart className="text-sm" />
                        <span>{forum.likes}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex space-x-1">
                      {forum.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <FaBookmark className="text-sm" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                      >
                        <FaShare className="text-sm" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Study Groups Section */}
      {activeTab === 'groups' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Active Study Groups</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <FaPlus className="text-sm" />
              <span>Create Group</span>
            </motion.button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    group.isActive 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    {group.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                    {group.category}
                  </span>
                </div>
                
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{group.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{group.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                    <FaUsers className="text-sm" />
                    <span className="text-sm">{group.members} members</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                    <FaClock className="text-sm" />
                    <span className="text-sm">{group.nextSession}</span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Join Group
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Challenges Section */}
      {activeTab === 'challenges' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Active Challenges</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center space-x-2"
            >
              <FaTrophy className="text-sm" />
              <span>View All</span>
            </motion.button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-full text-xs font-medium">
                    {challenge.difficulty}
                  </span>
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium">
                    {challenge.prize}
                  </span>
                </div>
                
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{challenge.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{challenge.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                    <FaUsers className="text-sm" />
                    <span className="text-sm">{challenge.participants} participants</span>
                  </div>
                  <div className="flex items-center space-x-1 text-red-500">
                    <FaClock className="text-sm" />
                    <span className="text-sm">{challenge.deadline}</span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-orange-600 text-white py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                >
                  Join Challenge
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Leaderboard Section */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Community Leaderboard</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <FaFire className="text-orange-500" />
              <span>This Month</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="space-y-4">
              {leaderboard.map((user, index) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center" style={{display: 'none'}}>
                        <FaUser className="text-gray-500 dark:text-gray-400" />
                      </div>
                      {user.badge !== 'None' && (
                        <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          user.badge === 'Gold' ? 'bg-yellow-500 text-white' :
                          user.badge === 'Silver' ? 'bg-gray-400 text-white' :
                          'bg-orange-600 text-white'
                        }`}>
                          {user.badge === 'Gold' ? '🥇' : user.badge === 'Silver' ? '🥈' : '🥉'}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Rank #{user.rank}</p>
                    </div>
                  </div>
                  
                  <div className="flex-1 text-right">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{user.points.toLocaleString()}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">points</div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <FaGraduationCap className="text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Expert</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommunitySection; 