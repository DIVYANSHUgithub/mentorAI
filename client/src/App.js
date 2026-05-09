import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Signup from './components/signup';
import Login from './components/login';
import HomePage from './components/homePage';
import CoursesSection from './components/CoursesSection';
import ProgressSection from './components/ProgressSection';
import CommunitySection from './components/CommunitySection';
import SettingsSection from './components/SettingsSection';
import ProtectedRoute from './ProtectedRoute';
import { DarkThemeProvider } from './components/DarkThemeProvider';
import EduAIAssistant from './components/eduaiAssistant';
import OfferedCourses from './components/OfferedCourses';
import CourseDetail from './components/CourseDetail';



function App() {
  const user = JSON.parse(localStorage.getItem('userData')) || null;
  const handleLogout = () => {
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
          
          <Route path="/progress" element={<ProtectedRoute><ProgressSection /></ProtectedRoute>} />
          <Route path="/courses" element={<ProtectedRoute><OfferedCourses/></ProtectedRoute>}/>
          <Route path="/courses/:id" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
          <Route path="/community" element={<ProtectedRoute><CommunitySection /></ProtectedRoute>} />
          <Route path="/ai-assistant" element={<ProtectedRoute><EduAIAssistant/></ProtectedRoute>}/>
          <Route path="/settings" element={<ProtectedRoute><SettingsSection user={user} handleLogout={handleLogout} /></ProtectedRoute>} />
        </Routes>
      </Router>
    </DarkThemeProvider>
  );
}

export default App;
