import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle2, Clock, Plus, Archive } from 'lucide-react';
import CourseStatCard from '../../components/courses/CourseStatCard';

export default function DashboardPage() {
  const [stats, setStats] = useState({ total: 0, published: 0, draft: 0, archived: 0 });
  const [recentCourses, setRecentCourses] = useState([]);
  const [loading, setLoading] = useState(true);


  const statCards = [
    {
      label: 'Total Courses',
      value: String(stats.total),
      icon: BookOpen,
      iconBg: 'bg-indigo-100',
      iconFg: 'text-indigo-600',
    },
    {
      label: 'Published',
      value: String(stats.published),
      icon: CheckCircle2,
      iconBg: 'bg-emerald-100',
      iconFg: 'text-emerald-600',
    },
    {
      label: 'Drafts',
      value: String(stats.draft),
      icon: Clock,
      iconBg: 'bg-amber-100',
      iconFg: 'text-amber-600',
    },
    {
      label: 'Archived',
      value: String(stats.archived),
      icon: Archive,
      iconBg: 'bg-sky-100',
      iconFg: 'text-sky-600',
    },
  ];

  return (
    <main className="px-4 sm:px-6 py-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Welcome back</h2>
          <p className="text-sm text-slate-500 mt-0.5">Manage your educational platform from here</p>
        </div>
        <Link
          to="/courses/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
        >
          <Plus size={16} />
          Add New Course
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <CourseStatCard key={s.label} {...s} />
        ))}
      </div>

      <section className="bg-white rounded-2xl border border-slate-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="text-base font-semibold text-slate-900">Recent Courses</h3>
          <Link to="/courses" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
            View all
          </Link>
        </div>

        {loading ? (
          <p className="px-5 py-6 text-sm text-slate-500">Loading...</p>
        ) : recentCourses.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p className="text-sm text-slate-500">No courses yet. Create your first course to get started.</p>
            <Link
              to="/courses/new"
              className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
            >
              <Plus size={16} />
              Create Course
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {recentCourses.map((course) => (
              <li key={course._id}>
                <Link
                  to={`/courses/${course._id}/edit`}
                  className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{course.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {course.category || 'Uncategorized'} · {course.status}
                    </p>
                  </div>
                  <span className="text-xs text-slate-400 capitalize">{course.level}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
