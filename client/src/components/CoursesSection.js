import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaSearch, 
  FaFilter, 
  FaStar, 
  FaClock, 
  FaUsers, 
  FaPlay,
  FaBook,
  FaCode,
  FaDatabase,
  FaRobot,
  FaMobile,
  FaGlobe,
  FaVideo,
  FaChevronRight
} from 'react-icons/fa';

function CoursesSection() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(() => setCourses([]));
  }, []);

  const handleCourseClick = (course) => {
    navigate(`/courses/${course._id}`);
  };

  const handleAddCourse = () => {
    navigate('/add-course');
  };

  const categories = [
    { name: 'All', icon: FaBook, count: courses.length },
    { name: 'Programming', icon: FaCode, count: courses.filter(c => c.category === 'Programming').length },
    { name: 'Data Science', icon: FaDatabase, count: courses.filter(c => c.category === 'Data Science').length },
    { name: 'AI & ML', icon: FaRobot, count: courses.filter(c => c.category === 'AI & ML').length },
    { name: 'Web Development', icon: FaGlobe, count: courses.filter(c => c.category === 'Web Development').length },
    { name: 'Mobile Development', icon: FaMobile, count: courses.filter(c => c.category === 'Mobile Development').length }
    
  ];

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Filter out any course objects missing required fields
  const validCourses = courses.filter(course => course && typeof course === 'object');

  const filteredCourses = validCourses.filter(course => {
    const title = course.title || '';
    const instructor = course.instructor || '';
    const category = course.category || '';
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

    const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.students - a.students;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'price-low':
        return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
      case 'price-high':
        return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Courses Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Explore Courses 🎓
            </h1>
            <p className="text-purple-100 dark:text-purple-200">
              Discover the perfect course to advance your skills
            </p>
          </div>
          <div className="hidden md:block">
            <FaBook className="text-6xl text-purple-200 dark:text-purple-300" />
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search courses, instructors, or topics..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Category Filters */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.name
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <category.icon className="text-sm" />
                <span>{category.name}</span>
                <span className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-xs">
                  {category.count}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Level Filters */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Level</h3>
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <motion.button
                key={level}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedLevel === level
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {level}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600 dark:text-gray-300">
          Showing {sortedCourses.length} of {courses.length} courses
        </p>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <FaFilter className="text-sm" />
          <span>Filters applied</span>
        </div>
      </div>

      {/* Add Course Button */}
      <div className="flex justify-end mb-4">
        <button onClick={handleAddCourse} className="bg-blue-600 text-white px-4 py-2 rounded">Add New Course</button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedCourses.map((course, index) => (
          <motion.div
            key={course._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => handleCourseClick(course)}
          >
            <div className="relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="absolute inset-0 bg-gray-300 dark:bg-gray-600 flex items-center justify-center" style={{display: 'none'}}>
                <FaVideo className="text-gray-500 dark:text-gray-400 text-4xl" />
              </div>
              {course.isFeatured && (
                <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Featured
                </div>
              )}
              <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                {course.duration}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <FaPlay className="text-white text-3xl opacity-0 hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${course.level === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : course.level === 'Intermediate' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'}`}>
                  {course.level}
                </span>
                <div className="flex items-center space-x-1">
                  <FaStar className="text-yellow-400 text-sm" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{course.rating}</span>
                </div>
              </div>

              <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{course.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{course.instructor}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <FaClock className="text-xs" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaUsers className="text-xs" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                </div>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{course.price}</span>
              </div>

              {course.progress > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Progress</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  {course.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-1"
                >
                  <span>{course.progress > 0 ? 'Continue' : 'Start'}</span>
                  <FaChevronRight className="text-xs" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      {sortedCourses.length > 0 && (
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Load More Courses
          </motion.button>
        </div>
      )}

      {/* No Results */}
      {sortedCourses.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FaBook className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No courses found</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Try adjusting your search criteria or filters
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedCategory('All');
              setSelectedLevel('All');
              setSortBy('popular');
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}

export default CoursesSection; 