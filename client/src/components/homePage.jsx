import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import DashboardSection from './DashboardSection';
import ProgressSection from './ProgressSection';
import CoursesSection from './Course/CoursesSection';
import CommunitySection from './CommunitySection';
import SettingsSection from './SettingsSection';
import OfferedCourses from './Course/OfferedCourses';

function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed] = useState(false);
  

  // Mock user data
  useEffect(() => {
    const userData = localStorage.getItem('loggedInUser');
    setUser(userData);
  }, []);

  // Mock course data
  const courses = [
    {
      id: 1,
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Sarah Chen",
      duration: "8 weeks",
      level: "Beginner",
      rating: 4.8,
      students: 12450,
      thumbnail: "https://img.youtube.com/vi/8jLoIO9DgQk/maxresdefault.jpg",
      progress: 65,
      category: "AI & ML",
      price: "$99",
      isFeatured: true,
      tags: ["Python", "TensorFlow", "Neural Networks"]
    },
    {
      id: 2,
      title: "React.js Complete Guide",
      instructor: "Mike Johnson",
      duration: "6 weeks",
      level: "Intermediate",
      rating: 4.9,
      students: 18920,
      thumbnail: "https://img.youtube.com/vi/Ke90Tje7VS0/maxresdefault.jpg",
      progress: 0,
      category: "Web Development",
      price: "$79",
      isFeatured: true,
      tags: ["JavaScript", "React", "Frontend"]
    },
    {
      id: 3,
      title: "Python for Data Science",
      instructor: "Emily Rodriguez",
      duration: "10 weeks",
      level: "Beginner",
      rating: 4.7,
      students: 15680,
      thumbnail: "https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg",
      progress: 30,
      category: "Data Science",
      price: "$89",
      isFeatured: false,
      tags: ["Python", "Pandas", "Matplotlib"]
    },
    {
      id: 4,
      title: "Advanced JavaScript Concepts",
      instructor: "Alex Thompson",
      duration: "4 weeks",
      level: "Advanced",
      rating: 4.6,
      students: 8920,
      thumbnail: "https://img.youtube.com/vi/916GWv2Qs08/maxresdefault.jpg",
      progress: 0,
      category: "Programming",
      price: "$69",
      isFeatured: false,
      tags: ["JavaScript", "ES6+", "Async/Await"]
    },
  ];

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
    totalCourses: 156,
    completedLessons: 47,
    totalHours: 23.5,
    currentStreak: 7,
    certificates: 3,
    rank: "Gold"
  };

  const recentActivities = [
    {
      id: 1,
      type: "lesson_completed",
      title: "Completed Neural Networks Basics",
      course: "Machine Learning Fundamentals",
      time: "2 hours ago",
      icon: "FaCheckCircle"
    },
    {
      id: 2,
      type: "quiz_taken",
      title: "Scored 85% on React Hooks Quiz",
      course: "React.js Complete Guide",
      time: "1 day ago",
      icon: "FaTrophy"
    },
    {
      id: 3,
      type: "course_started",
      title: "Started Python for Data Science",
      course: "Python for Data Science",
      time: "3 days ago",
      icon: "FaPlay"
    }
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
            courses={courses}
            recentActivities={recentActivities}
          />
        );
      case 'courses':
        return <OfferedCourses />;
      case 'community':
        return <CommunitySection />;
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
