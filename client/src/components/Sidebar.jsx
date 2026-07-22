import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaChartLine, 
  FaBook, 
  FaTrophy, 
  FaUsers, 
  FaRobot,
  FaCog,
  FaSignOutAlt
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Sidebar({ 
  activeTab, 
  setActiveTab, 
  sidebarCollapsed
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaChartLine },
    { id: 'courses', label: 'Courses', icon: FaBook },
    { id: 'progress', label: 'Progress', icon: FaTrophy },
    { id: 'community', label: 'Community', icon: FaUsers },
    { id: 'ai-chat', label: 'AI Assistant', icon: FaRobot },
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

  return (
    <aside className={`bg-white dark:bg-gray-800 shadow-sm border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if(item.id==='ai-chat'){
                navigate('/ai-assistant');
                }
                else if(item.id==='courses')
                {
                  navigate(`/courses`);
                }
                else
                  setActiveTab(item.id);
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
