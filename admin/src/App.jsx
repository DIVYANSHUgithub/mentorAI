import React from 'react';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import { CourseProvider } from './context/CourseContext';
import AdminLayout from './components/layout/AdminLayout';
import DashboardPage from './pages/Dashboard/dashboard';
import AllCoursesPage from './pages/courses/AllCourses';
import CreateCoursePage from './pages/courses/CreateCourse';
import SectionsPage from './pages/courses/Sections';
import PricingPage from './pages/courses/Pricing';
import UploadContentPage from './pages/courses/UploadContent';
import PublishCoursePage from './pages/courses/PublishCourse';
import SelectCoursePage from './pages/courses/SelectCourse';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <CourseProvider>
        <AdminLayout />
      </CourseProvider>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      {
        path: 'dashboard',
        element: <DashboardPage />,
        handle: { title: 'Dashboard' },
      },
      {
        path: 'courses',
        element: <Outlet />,
        handle: { title: 'All Courses' },
        children: [
          { index: true, element: <AllCoursesPage /> },
          {
            path: 'new',
            element: <CreateCoursePage />,
            handle: { title: 'Add New Course' },
          },
          {
            path: 'select',
            element: <SelectCoursePage />,
            handle: { title: 'Select Course' },
          },
          {
            path: ':courseId/edit',
            element: <CreateCoursePage />,
            handle: { title: 'Edit Course' },
          },
          {
            path: ':courseId/sections',
            element: <SectionsPage />,
            handle: { title: 'Course Sections' },
          },
          {
            path: ':courseId/pricing',
            element: <PricingPage />,
            handle: { title: 'Course Pricing' },
          },
          {
            path: ':courseId/upload',
            element: <UploadContentPage />,
            handle: { title: 'Upload Content' },
          },
          {
            path: ':courseId/publish',
            element: <PublishCoursePage />,
            handle: { title: 'Publish Course' },
          },
        ],
      },
      { path: '*', element: <Navigate to="/dashboard" replace /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
