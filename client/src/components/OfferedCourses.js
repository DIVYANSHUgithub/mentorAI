import React from 'react';
import { useNavigate } from 'react-router-dom';

const COURSES = [
  {
    id: 1,
    title: 'Maths for Machine Learning',
    instructor: 'Dr. Ashish Agrawal',
    level: 'All Levels',
    duration: '8 weeks',
    category: 'AI & ML',
    price: '5999',
    rating: 4.8,
  },
  {
    id: 2,
    title: 'React.js Complete Guide',
    instructor: 'Anurag Singh',
    level: 'Intermediate',
    duration: '6 weeks',
    category: 'Web Development',
    price: '₹1999',
    rating: 4.9,
  },
  {
    id: 3,
    title: 'Python for Data Science',
    instructor: 'Emily Rodriguez',
    level: 'Beginner',
    duration: '10 weeks',
    category: 'Data Science',
    price: '₹2999',
    rating: 4.7,
  },
  {
    id: 4,
    title: 'Advanced JavaScript Concepts',
    instructor: 'Hitesh Chaudhury',
    level: 'Advanced',
    duration: '4 weeks',
    category: 'Programming',
    price: '₹3999',
    rating: 4.6,
  },
   {
    id: 5,
    title: 'Maths for Machine Learning',
    instructor: 'Dr. Ashish Agrawal',
    level: 'All Levels',
    duration: '8 weeks',
    category: 'AI & ML',
    price: '5999',
    rating: 4.8,
  },
];

function OfferedCourses() {
  const navigate = useNavigate();

  const handleOpenCourse = (id) => {
    navigate(`/courses/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold tracking-[0.25em] text-indigo-500 uppercase">
            eduAI Courses
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Learn with curated{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              eduAI paths
            </span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            All courses below are designed and uploaded by eduAI experts. Enroll to unlock full video
            content, notes, and hands-on projects.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course) => (
            <article
              key={course.id}
              onClick={() => handleOpenCourse(course.id)}
              className="flex flex-col justify-between rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow duration-200 border border-gray-100 dark:border-gray-700 p-5 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-200 px-3 py-1 text-xs font-semibold">
                    {course.category}
                  </span>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-300">
                    {course.level}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {course.title}
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  By {course.instructor}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{course.duration}</span>
                  <span>⭐ {course.rating}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Price</p>
                  <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    {course.price}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenCourse(course.id);
                  }}
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:shadow-md hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  View details
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OfferedCourses;