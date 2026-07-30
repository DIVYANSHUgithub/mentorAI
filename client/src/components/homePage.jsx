import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import DashboardSection from './DashboardSection';
import ProgressSection from './ProgressSection';
// import CoursesSection from './Course/CoursesSection';
import CommunitySection from './CommunitySection';
import SettingsSection from './SettingsSection';
import OfferedCourses from './Course/OfferedCourses';
import EduAIAssistant from './eduaiAssistant';
import MyLearningDashboard from './Course/MyLearning';

function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const {userId}=useParams();

  // Mock user data
  useEffect(() => {
    const userData = localStorage.getItem('loggedInUser');
    setUser(userData);
  }, []);

  // Mock course data
  const notifications = [
    
  ];

  const stats = {
    
  };

  const recentActivities = [
   
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('userMail');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    navigate('/');
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardSection
            user={user}
            stats={stats}
            recentActivities={recentActivities}
            searchQuery={searchQuery}
          />
        );
      case 'progress':
        return (
          <ProgressSection
            stats={stats}
            
            recentActivities={recentActivities}
          />
        );
      case 'courses':
        return <OfferedCourses userId/>;
      case 'myLearning':
        return <MyLearningDashboard/>;
      case 'community':
        return <CommunitySection />;
      case 'ai-assistant':
        return <EduAIAssistant/>
      case 'settings':
        return (
          <SettingsSection
            user={user}
            handleLogout={handleLogout}
          />
        );
      default:
        return (
          <DashboardSection
            user={user}
            stats={stats}
            recentActivities={recentActivities}
            searchQuery={searchQuery}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header
        user={user}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        notifications={notifications}
        setMobileSidebarOpen={setMobileSidebarOpen}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
            mobileSidebarOpen={mobileSidebarOpen}
            setMobileSidebarOpen={setMobileSidebarOpen}
            handleLogout={handleLogout}
        />
        {mobileSidebarOpen && (
            <div
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={() => setMobileSidebarOpen(false)}
            />
        )}
        {/* Main Content */}
        <main className="flex-1 w-full min-w-0 p-2 sm:p-4 md:p-6 overflow-x-hidden">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
}

export default HomePage;
