import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { useActiveCourse } from '../../context/CourseContext';

function SelectCoursePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setActiveCourseId } = useActiveCourse();

  const redirect = searchParams.get('redirect') || 'sections';



  const handleSelect = (courseId) => {
    setActiveCourseId(courseId);
    navigate(`/courses/${courseId}/${redirect}`);
  };

  return (
    <main className="px-4 sm:px-6 py-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-2xl">
        <h2 className="text-base font-semibold text-slate-900">Select a Course</h2>
        <p className="text-sm text-slate-500 mt-1 mb-6">
          Choose a course to manage its {redirect === 'upload' ? 'content' : 'sections'}.
        </p>

        {loading && <p className="text-sm text-slate-500">Loading courses...</p>}
        {error && <p className="text-sm text-rose-500">{error}</p>}

        {!loading && !error && courses.length === 0 && (
          <p className="text-sm text-slate-500">
            No courses yet. Create one from Add New Course.
          </p>
        )}

        <ul className="space-y-2">
          {courses.map((course) => (
            <li key={course._id}>
              <button
                type="button"
                onClick={() => handleSelect(course._id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                  <BookOpen size={18} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{course.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {course.category || 'Uncategorized'} · {course.status}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default SelectCoursePage;
