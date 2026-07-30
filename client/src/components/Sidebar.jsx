import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaChartLine, 
  FaBook, 
  FaTrophy, 
  FaUsers, 
  FaRobot,
  FaCog,
  FaSignOutAlt,
  FaBookmark,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Sidebar({ 
  activeTab,
  setActiveTab,
  sidebarCollapsed,
  setSidebarCollapsed,
  mobileSidebarOpen,
  setMobileSidebarOpen
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaChartLine },
    { id: 'courses', label: 'Courses', icon: FaBook },
    { id: 'myLearning', label: 'My Learning', icon: FaBookmark},
    { id: 'progress', label: 'Progress', icon: FaTrophy },
    { id: 'community', label: 'Community', icon: FaUsers },
    { id: 'ai-assistant', label: 'AI Assistant', icon: FaRobot },
    { id: 'settings', label: 'Settings', icon: FaCog }
  ];
  const navigate=useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('userMail');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');
    navigate('/');
  };
  const sidebarWidth =
    mobileSidebarOpen
        ? "w-64"
        : sidebarCollapsed
        ? "w-20"
        : "w-64";
  const sidebarClasses = `
      fixed md:static
      top-0 left-0
      h-screen
      z-50
      bg-white dark:bg-gray-800
      border-r border-gray-200 dark:border-gray-700
      shadow-lg
      transition-all duration-300

      w-64

      ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}

      md:translate-x-0
      ${sidebarCollapsed ? "md:w-20" : "md:w-64"}
      `;

  return (
    <aside className={sidebarClasses}>
      <div className="flex justify-end p-2">
          <button
              onClick={() => {
                  if (window.innerWidth < 768) {
                      setMobileSidebarOpen(false);
                  } else {
                      setSidebarCollapsed(!sidebarCollapsed);
                  }
              }}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
          >
              {sidebarCollapsed ? (
                  <FaChevronRight />
              ) : (
                  <FaChevronLeft />
              )}
          </button>
      </div>
      <div className="p-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                  setActiveTab(item.id);

                  if (window.innerWidth < 768) {
                      setMobileSidebarOpen(false);
                  }
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-r-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <item.icon className="text-lg" />
              {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
            </motion.button>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <FaSignOutAlt className="text-lg" />
            {!sidebarCollapsed && <span className="font-medium">Sign Out</span>}
          </motion.button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar; 
