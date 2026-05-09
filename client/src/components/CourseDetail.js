import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const COURSE_DETAILS = [
  {
    id: 1,
    title: 'Maths for Machine Learning',
    instructor: 'Dr. Ashish Agrawal',
    level: 'All Levels',
    duration: '8 weeks',
    category: 'AI & ML',
    price: '₹5999',
    rating: 4.8,
    description:
      'Build the mathematical foundation you need for modern machine learning: linear algebra, calculus, probability, and optimization, all explained with ML examples.',
    videos: [
      'Welcome & course overview',
      'Linear algebra essentials for ML',
      'Eigenvalues & eigenvectors in practice',
      'Calculus for gradient-based learning',
      'Probability & distributions',
      'Optimization and gradient descent',
    ],
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
    description:
      'Go from React basics to real-world apps with hooks, routing, context, and best practices for scalable frontends.',
    videos: [
      'Intro to React & JSX',
      'Components, props, and state',
      'React Router & navigation',
      'Context API & global state',
      'Performance patterns & optimization',
    ],
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
    description:
      'Start from zero and learn Python, NumPy, Pandas, and visualization to analyze and tell stories with data.',
    videos: [
      'Getting started with Python',
      'Working with NumPy arrays',
      'Data wrangling with Pandas',
      'Exploratory data analysis',
      'Visualizing data with Matplotlib & Seaborn',
    ],
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
    description:
      'Deep-dive into closures, prototypes, async patterns, and performance so you can reason about complex JavaScript codebases.',
    videos: [
      'Execution context & call stack',
      'Closures & higher-order functions',
      'Prototype chain & OOP in JS',
      'Async JS: promises, async/await',
      'Performance tuning & best practices',
    ],
  },
  {
    id: 5,
    title: 'Maths for Machine Learning',
    instructor: 'Dr. Ashish Agrawal',
    level: 'All Levels',
    duration: '8 weeks',
    category: 'AI & ML',
    price: '₹5999',
    rating: 4.8,
    description:
      'Build the mathematical foundation you need for modern machine learning: linear algebra, calculus, probability, and optimization, all explained with ML examples.',
    videos: [
      'Welcome & course overview',
      'Linear algebra essentials for ML',
      'Eigenvalues & eigenvectors in practice',
      'Calculus for gradient-based learning',
      'Probability & distributions',
      'Optimization and gradient descent',
    ],
  },
];

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const courseId = Number(id);
  const course = COURSE_DETAILS.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md text-center bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Course not found</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            The course you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <button
            type="button"
            onClick={() => navigate('/courses')}
            className="inline-flex items-center rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          type="button"
          onClick={() => navigate('/courses')}
          className="mb-4 inline-flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline"
        >
          ← Back to all courses
        </button>

        <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] text-indigo-500 uppercase">
                {course.category}
              </p>
              <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                {course.title}
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                By {course.instructor}
              </p>
            </div>
            <div className="text-right text-sm text-gray-600 dark:text-gray-300">
              <p className="font-semibold">{course.level}</p>
              <p>{course.duration}</p>
              <p className="mt-1 text-yellow-500 font-semibold">⭐ {course.rating}</p>
              <p className="mt-2 text-lg font-bold text-indigo-600 dark:text-indigo-400">
                {course.price}
              </p>
            </div>
          </div>

          {/* Description Section */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Description
            </h2>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              {course.description}
            </p>
          </section>

          {/* Videos Section */}
          <section>
            <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              Videos
            </h2>
            {course.videos && course.videos.length > 0 ? (
              <ol className="space-y-2 list-decimal list-inside text-sm sm:text-base text-gray-700 dark:text-gray-300">
                {course.videos.map((videoTitle, idx) => (
                  <li key={idx} className="py-1">
                    {videoTitle}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">No videos available.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;