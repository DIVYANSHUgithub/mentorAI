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
  const [sidebarCollapsed] = useState(false);
  const {userId}=useParams();

  // Mock user data
  useEffect(() => {
    const userData = localStorage.getItem('loggedInUser');
    setUser(userData);
  }, []);

  // Mock course data
  const notifications = [
    {
      id: 1,
      title: "New course available",
      message: "Advanced React Patterns is now live!",
      time: "2 hours ago",
      type: "course"
    },
    {
      id: 2,
      title: "Assignment reminder",
      message: "ML Fundamentals Quiz 3 due tomorrow",
      time: "1 day ago",
      type: "assignment"
    },
    {
      id: 3,
      title: "Achievement unlocked",
      message: "You've completed 10 lessons this week!",
      time: "2 days ago",
      type: "achievement"
    }
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
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarCollapsed={sidebarCollapsed}
          handleLogout={handleLogout}
        />

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
}

export default HomePage;
