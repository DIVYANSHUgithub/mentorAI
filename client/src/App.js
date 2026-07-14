import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Signup from './components/signup';
import Login from './components//login';
import HomePage from './components/homePage';
import ProgressSection from './components/ProgressSection';
import CommunitySection from './components/CommunitySection';
import SettingsSection from './components/SettingsSection';
import ProtectedRoute from './ProtectedRoute';
import { DarkThemeProvider } from './components/DarkThemeProvider';
import EduAIAssistant from './components/eduaiAssistant';
import OfferedCourses from './components/Course/OfferedCourses';
import CourseDetails from './components/Course/CourseDetail';
import VideoPlayer from './components/Course/VideoPlayer';


function App() {
  const user = localStorage.getItem('loggedInUser') || null;
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('userMail');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');
    window.location.href = '/login';
  };
  

  return (
    <DarkThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          
          <Route
            path="/progress"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 sm:p-6">
                  <ProgressSection showDashboardBack />
                </div>
              </ProtectedRoute>
            }
          />
          <Route 
              path="/courses" 
              element={
                <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 sm:p-6">
                      <OfferedCourses showDashboardBack />
                </div>}/>

          <Route
              path="/course/:id"
              element={
                <CourseDetails/>
              }
              />
          <Route
            path="/learn/:courseId/:lectureId"
            element={
              <VideoPlayer/>
            }
          />
          {/* <Route path="/courses/:id/learn" element={<ProtectedRoute><BatchLearn /></ProtectedRoute>} /> */}
          {/* <Route path="/courses/:id" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} /> */}
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 sm:p-6">
                  <CommunitySection showDashboardBack />
                </div>
              </ProtectedRoute>
            }
          />
          <Route path="/ai-assistant" element={<ProtectedRoute><EduAIAssistant/></ProtectedRoute>}/>
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 sm:p-6">
                  <SettingsSection user={user} handleLogout={handleLogout} showDashboardBack />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </DarkThemeProvider>
  );
}

export default App;
